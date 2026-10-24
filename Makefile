.PHONY: build smoke-test package container-build container-run

build:
	wasm-pack --version && \
		wasm-pack build --target web --out-dir pkg-web/

smoke-test: build
	node tests/smoke.mjs pkg-web

# Release asset for partiql.github.io: dist/partiql-playground-web-<version>.tar.gz (see README.md)
package:
	scripts/package-web.sh

container-build:
	wasm-pack --version && \
		wasm-pack build --target nodejs --out-dir pkg-node/ && \
		docker build -f docker/Dockerfile . -t partiql-team/partiql-playground

container-run:
	docker run -d -p 8000:8000 partiql-team/partiql-playground
