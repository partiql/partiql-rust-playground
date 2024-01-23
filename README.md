# PartiQL Playground (Proof of Concept)

PartiQL Playground provides the functionality to execute PartiQL in a web environment.

_Please note, at this stage, the code as is in this package is considered experimental and should not be used for production._

:raised_hands: Checkout the [playground](https://partiql.org/playground.html#/evaluate) now :raised_hands:. 

## Development
This Branch contains Rust Code for WASM generation.

`PartiQL Playground` uses [WebAssembly (Wasm)](https://webassembly.org/) for integrating the front-end with PartiQL Rust back-end.

Upon merging pull request, the GitHub action will automatically create a new pull request towards `react-website` branch. 

The `React Website` branch contains code for the experimental web application. 

To run test: 
```

```

## Build and run the website application (Locally)
1. Checkout main branch and develop
2. Build the package using `make`
```commandline
make build
```
3. Port the wasm files to `react wesbite` branch
```commandline
git checkout -b temp
make buid
rm pkg-web/.gitignore
git add .
git commit -m "adding pkg-web to git"
git checkout react-website
git checkout temp -- pkg-web
git add pkg-web
git commit -m "wasm update"
```

4. Build the `react website branch`
```commandline
npm i
npm run serve
```

## Docker Build
```commandline
make container-build
make container-run
```

### Restful API
```commandline
# Example for parsing `SELECT * FROM {'a': 1}` statement
curl -H 'Content-Type: application/json; charset=UTF-8' \
  -H "Accept: application/json" \
  --data '{"query": "SELECT * FROM {'a': 1}"}' \
  -X POST http://localhost:8000/parse

"{\"text\":\"SELECT * FROM {a: 1}\",\"offsets\":{\"line_starts\":[0]},\"ast\":{\"Query\":{\"id\":9,\"node\":{\"set\":{\"id\":8,\"node\":{\"Select\":{\"id\":7,\"node\":{\"project\":{\"id\":1,\"node\":{\"kind\":\"ProjectStar\",\"setq\":\"All\"}},\"from\":{\"id\":6,\"node\":{\"source\":{\"FromLet\":{\"id\":5,\"node\":{\"expr\":{\"Struct\":{\"id\":4,\"node\":{\"fields\":[{\"first\":{\"VarRef\":{\"id\":2,\"node\":{\"name\":{\"value\":\"a\",\"case\":\"CaseInsensitive\"},\"qualifier\":\"Unqualified\"}}},\"second\":{\"Lit\":{\"id\":3,\"node\":{\"Int64Lit\":1}}}}]}}},\"kind\":\"Scan\",\"as_alias\":null,\"at_alias\":null,\"by_alias\":null}}}}},\"from_let\":null,\"where_clause\":null,\"group_by\":null,\"having\":null}}}},\"order_by\":null,\"limit\":null,\"offset\":null}}},\"locations\":{\"1\":{\"start\":0,\"end\":8},\"2\":{\"start\":15,\"end\":16},\"3\":{\"start\":18,\"end\":19},\"4\":{\"start\":14,\"end\":20},\"5\":{\"start\":14,\"end\":20},\"6\":{\"start\":9,\"end\":20},\"7\":{\"start\":0,\"end\":20},\"8\":{\"start\":0,\"end\":20},\"9\":{\"start\":0,\"end\":20}}}"%

# Example for explaining (logical planning) `SELECT * FROM {'a': 1}` statement
curl -H 'Content-Type: application/json; charset=UTF-8' \
  -H "Accept: application/json" \
  --data '{"query": "SELECT * FROM {'a': 1}"}' \
  -X POST http://localhost:8000/explain

"\"LogicalPlan { nodes: [ProjectAll, Scan(Scan { expr: TupleExpr(TupleExpr { attrs: [VarRef(CaseInsensitive(\\\"a\\\"))], values: [Lit(1)] }), as_key: \\\"_1\\\", at_key: None }), Sink], edges: [(OpId(2), OpId(1), 0), (OpId(1), OpId(3), 0)] }\""%

# Example for evaluating `SELECT * FROM env` statement
curl -H 'Content-Type: application/json; charset=UTF-8' \
  -H "Accept: application/json" \
  --data '{"query": "SELECT * FROM env", "env": "{'\''env'\'' : <<{'\''a'\'': 1,'\''b'\'': 2 }>>}"}' \
  -X POST http://localhost:8000/eval

"{\"Ok\":{\"Bag\":[{\"Tuple\":{\"attrs\":[\"a\",\"b\"],\"vals\":[{\"Integer\":1},{\"Integer\":2}]}}]}}"%  
```


## Dependencies
| Package                                                                | License                                                                                         |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)               | [Apache License Version 2.0](https://github.com/rustwasm/wasm-bindgen/blob/main/LICENSE-APACHE) | 
| [wasm-pack](https://github.com/rustwasm/wasm-pack)                     | [Apache License Version 2.0](https://github.com/rustwasm/wasm-pack/blob/master/LICENSE-APACHE)  |
| [node](https://nodejs.org/en/)                                         | [MIT License](https://github.com/nodejs/node/blob/main/LICENSE)                                 |
| [body-parser](https://github.com/expressjs/body-parser)                | [MIT License](https://github.com/expressjs/body-parser/blob/master/LICENSE)                     |