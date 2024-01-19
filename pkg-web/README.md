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


## Legacy Asset
| Branch Name | Asset                                                                                               | 
|-------------|-----------------------------------------------------------------------------------------------------| 
| Docker      | A version of PartiQL Playground implementation. Additional features includes docker build Rest APIs |

## Dependencies
| Package                                                                | License                                                                                         |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)               | [Apache License Version 2.0](https://github.com/rustwasm/wasm-bindgen/blob/main/LICENSE-APACHE) | 
| [wasm-pack](https://github.com/rustwasm/wasm-pack)                     | [Apache License Version 2.0](https://github.com/rustwasm/wasm-pack/blob/master/LICENSE-APACHE)  |