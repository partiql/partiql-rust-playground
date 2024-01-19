#PartiQL Rust Playground

This is the PartiQL Rust Playground in React. 

To build: 
```
npm i 
npm run serve
```

To bundle
```
npm run build
```

## Wasm 

PartiQL-Rust-Playground utilized WASM(web assembly) to run PartiQL-rust in the web browser. To lean more on web assembly, visit: https://webassembly.org/

### Generate wasm file. 
1. Manual Build
    From `main` branch, run 
    ```shell
    wasm-pack build --target web --out-dir pkg-web
    git add pkg-web
    git commit -m "commit wasm files"
    git checkout react-website
    git checkout main -- pkg-web
    ```
   
2. GitHub Workflow
Any push towards the main branch will automatically trigger a workflow that build the wasm file and created a PR to copy the wasm file to branch `react-website`
   
