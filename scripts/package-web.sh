#!/usr/bin/env bash
# Builds the `--target web` wasm package and bundles it, with its license files, into
#   dist/partiql-playground-web-<version>.tar.gz  (+ .sha256)
# This is the release asset partiql.github.io downloads. Run from the repository root; used by
# .github/workflows/release.yml and `make package`.
#
# The build is meant to be reproducible: the toolchain is pinned in rust-toolchain.toml, dependencies in
# Cargo.lock, wasm-bindgen by Cargo.lock and wasm-opt by the wasm-pack version, and local paths are
# remapped out of the binary. Building the same commit with the same wasm-pack gives the same archive.
#
# Usage: scripts/package-web.sh [version]   (default: the version in Cargo.toml)
# Needs: wasm-pack, cargo-about (cargo install --locked --features cli cargo-about@0.9.2), python3, node
set -euo pipefail

meta() {
  cargo metadata --format-version 1 --locked "$@"
}
crate_version=$(meta --no-deps | python3 -c 'import json,sys; print(json.load(sys.stdin)["packages"][0]["version"])')
version=${1:-$crate_version}
version=${version#v}
if [[ "$version" != "$crate_version" ]]; then
  echo "error: version $version does not match Cargo.toml ($crate_version)" >&2
  exit 1
fi

name=partiql-playground-web-$version
out=pkg-web

# Keep machine-specific paths (e.g. in panic messages) out of the .wasm. Both the logical and physical
# forms are remapped, since either can reach rustc when a parent directory is a symlink.
cargo_home=${CARGO_HOME:-$HOME/.cargo}
target_dir=$(meta --no-deps | python3 -c 'import json,sys; print(json.load(sys.stdin)["target_directory"])')
# With the rust-src component installed, std paths point into the local toolchain instead of /rustc/<hash>.
rust_src="$(rustc --print sysroot)/lib/rustlib/src/rust"
rustc_dir="/rustc/$(rustc -vV | sed -n 's/^commit-hash: //p')"
RUSTFLAGS=""
for dir in "$cargo_home=/cargo" "$PWD=/src" "$target_dir=/target" "$rust_src=$rustc_dir"; do
  path=${dir%=*}
  for p in "$path" "$(cd "$path" 2> /dev/null && pwd -P)"; do
    [[ -n "$p" ]] && RUSTFLAGS+=" --remap-path-prefix=$p=${dir##*=}"
  done
done
export RUSTFLAGS

rm -rf "$out"
wasm-pack build --release --target web --out-dir "$out" -- --locked
node tests/smoke.mjs "$out"

cargo about generate --locked --fail about.hbs -o "$out/THIRD_PARTY_LICENSES.txt"
python3 scripts/gen_notice.py > "$out/NOTICE"
cp LICENSE "$out/LICENSE"

dep_version() {
  meta | python3 -c 'import json,sys; print(next(p["version"] for p in json.load(sys.stdin)["packages"] if p["name"] == sys.argv[1]))' "$1"
}
dirty=false
[[ -n "$(git status --porcelain)" ]] && dirty=true
cat > "$out/build-info.json" <<EOF
{
  "version": "$version",
  "commit": "$(git rev-parse HEAD)",
  "dirty": $dirty,
  "partiql": "$(dep_version partiql-eval)",
  "wasmBindgen": "$(dep_version wasm-bindgen)"
}
EOF

python3 scripts/archive.py "dist/$name.tar.gz" "$name" "$(git log -1 --format=%ct)" "$out" \
  partiql_playground.js partiql_playground.d.ts partiql_playground_bg.wasm partiql_playground_bg.wasm.d.ts \
  package.json build-info.json LICENSE NOTICE THIRD_PARTY_LICENSES.txt
cat "dist/$name.tar.gz.sha256"
