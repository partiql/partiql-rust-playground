// Smoke test for the `wasm-pack --target web` build: loads the .wasm in Node and runs queries
// through the same exports the website uses.
// Usage: node tests/smoke.mjs [pkg-dir]   (default: pkg-web)
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const pkg = resolve(process.argv[2] || 'pkg-web')
const wasm = await import(pathToFileURL(resolve(pkg, 'partiql_playground.js')))
wasm.initSync({ module: readFileSync(resolve(pkg, 'partiql_playground_bg.wasm')) })

const env = `{
  'emp': <<
    {'name': 'Ana', 'dept': 'eng', 'salary': 120},
    {'name': 'Bob', 'dept': 'eng', 'salary': 100},
    {'name': 'Cy', 'dept': 'ops', 'salary': 90}
  >>,
  'dept': <<
    {'id': 'eng', 'title': 'Engineering'},
    {'id': 'ops', 'title': 'Operations'}
  >>
}`

// [title, query, expected output of eval_as_string with whitespace collapsed]
const cases = [
  ['simple select', "SELECT e.name FROM emp AS e WHERE e.salary > 95 ORDER BY e.name",
    "[ { name: 'Ana' }, { name: 'Bob' } ]"],
  ['correlated subquery',
    'SELECT d.title, (SELECT VALUE COUNT(*) FROM emp AS e WHERE e.dept = d.id) AS n FROM dept AS d ORDER BY d.title',
    "[ { title: 'Engineering', n: << 2 >> }, { title: 'Operations', n: << 1 >> } ]"],
  ['correlated subquery in WHERE',
    'SELECT VALUE e.name FROM emp AS e WHERE e.salary = (SELECT MAX(x.salary) FROM emp AS x WHERE x.dept = e.dept) ORDER BY e.name',
    "[ 'Ana', 'Cy' ]"],
  ['correlated EXISTS',
    'SELECT VALUE e.name FROM emp AS e WHERE EXISTS (SELECT * FROM emp AS x WHERE x.dept = e.dept AND x.salary > e.salary)',
    "<< 'Bob' >>"],
  ['GROUP BY + aggregates',
    'SELECT e.dept AS dept, COUNT(*) AS n, SUM(e.salary) AS total, AVG(e.salary) AS avg FROM emp AS e GROUP BY e.dept ORDER BY dept',
    "[ { dept: 'eng', n: 2, total: 220, avg: 110 }, { dept: 'ops', n: 1, total: 90, avg: 90 } ]"],
  ['ORDER BY alias',
    'SELECT e.name AS who, e.salary * 2 AS twice FROM emp AS e ORDER BY twice DESC',
    "[ { who: 'Ana', twice: 240 }, { who: 'Bob', twice: 200 }, { who: 'Cy', twice: 180 } ]"],
]

let failed = 0
const check = (title, ok, detail) => {
  if (ok) return console.log(`ok   ${title}`)
  failed++
  console.error(`FAIL ${title}\n${detail}`)
}

for (const [title, query, expected] of cases) {
  let actual
  try {
    actual = wasm.eval_as_string(query, env).replace(/\s+/g, ' ').trim()
  } catch (e) {
    actual = `panic: ${e}`
  }
  check(title, actual === expected, `  query:    ${query}\n  expected: ${expected}\n  actual:   ${actual}`)
}

// The JSON contract the website relies on.
const json = JSON.parse(wasm.eval_as_json("SELECT VALUE e.name FROM emp AS e WHERE e.dept = 'ops'", env))
check('eval_as_json Ok shape', JSON.stringify(json) === '{"Ok":{"Bag":[{"String":"Cy"}]}}', `  actual: ${JSON.stringify(json)}`)
const parseErr = JSON.parse(wasm.parse_as_json('SELECT FROM'))
check('parse_as_json errors', Array.isArray(parseErr.errors) && parseErr.errors.length > 0, `  actual: ${JSON.stringify(parseErr)}`)
const envErr = JSON.parse(wasm.eval_as_json('SELECT * FROM t', '<< 1 >>'))
check('non-struct env error', String(envErr.Err).startsWith('Error in Env'), `  actual: ${JSON.stringify(envErr)}`)
const planErr = wasm.explain_as_string('SELECT FROM')
check('explain does not panic on bad input', typeof planErr === 'string', `  actual: ${planErr}`)
const session = wasm.decode_session_as_array(wasm.generate_session('SELECT 1', '{}'))
check('session round trip', session.length === 2 && session[0] === 'SELECT 1' && session[1] === '{}', `  actual: ${session}`)

if (failed) process.exit(1)
