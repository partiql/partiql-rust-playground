build:
	wasm-pack --version && \
		wasm-pack build --out-dir pkg-bundle/
		npm i && npm start && npm run serve

container-build:
	docker build . -t partiql-team/partiql-playground

container-run:
	docker run -d -p 8000:8000 partiql-team/partiql-playground