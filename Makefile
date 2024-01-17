build:
	wasm-pack --version && \
		wasm-pack build --target web --out-dir pkg-web/