#!/usr/bin/env bash
# Builds the `--target web` wasm package and bundles it, with its license files, into
#   dist/partiql-playground-web-<version>.tar.gz  (+ .sha256)
# This is the release asset partiql.github.io downloads. Run from the repository root; used by
# .github/workflows/release.yml and `make package`.
#
# Usage: scripts/package-web.sh [version]   (default: the version in Cargo.toml)
# Needs: wasm-pack, cargo-about (cargo install --locked --features cli cargo-about), python3, node
set -euo pipefail

crate_version=$(cargo metadata --format-version 1 --no-deps --locked |
  python3 -c 'import json,sys; print(json.load(sys.stdin)["packages"][0]["version"])')
version=${1:-$crate_version}
version=${version#v}
if [[ "$version" != "$crate_version" ]]; then
  echo "error: version $version does not match Cargo.toml ($crate_version)" >&2
  exit 1
fi

name=partiql-playground-web-$version
out=pkg-web

rm -rf "$out"
wasm-pack build --release --target web --out-dir "$out"
node tests/smoke.mjs "$out"

cargo about generate --locked --fail about.hbs -o "$out/THIRD_PARTY_LICENSES.txt"
python3 scripts/gen_notice.py > "$out/NOTICE"

dep_version() {
  cargo metadata --format-version 1 --locked |
    python3 -c 'import json,sys; print(next(p["version"] for p in json.load(sys.stdin)["packages"] if p["name"] == sys.argv[1]))' "$1"
}
cat > "$out/build-info.json" <<EOF
{
  "version": "$version",
  "commit": "$(git rev-parse HEAD)",
  "partiql": "$(dep_version partiql-eval)",
  "wasmBindgen": "$(dep_version wasm-bindgen)"
}
EOF

files=(partiql_playground.js partiql_playground.d.ts partiql_playground_bg.wasm partiql_playground_bg.wasm.d.ts
  package.json build-info.json LICENSE NOTICE THIRD_PARTY_LICENSES.txt)
cp LICENSE "$out/LICENSE"

mkdir -p dist
staging=$(mktemp -d)
mkdir "$staging/$name"
for f in "${files[@]}"; do cp "$out/$f" "$staging/$name/"; done
# Reproducible archive: fixed owner, mtime and order.
tar --sort=name --owner=0 --group=0 --numeric-owner --mtime="@$(git log -1 --format=%ct)" -C "$staging" -cf - "$name" |
  gzip -n > "dist/$name.tar.gz"
rm -rf "$staging"
(cd dist && sha256sum "$name.tar.gz" > "$name.tar.gz.sha256")
cat "dist/$name.tar.gz.sha256"
