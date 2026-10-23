# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-10-23
### Changed
- Updated to partiql-lang-rust 0.15.* (`partiql-parser`, `partiql-logical-planner`, `partiql-eval`).
- Planning and evaluation errors are now reported (`{"Err": "..."}` from `eval_as_json`) instead of
  evaluating to `MISSING`; `explain_as_*` return an error message instead of panicking on invalid input.
- Removed the workflow that opened PRs against the `react-website` branch.

### Added
- `/explain` and `/eval` REST APIs.
- `explain` and `eval` UI options.
- Release workflow: tagging `v<version>` publishes `partiql-playground-web-<version>.tar.gz` (Wasm package
  plus license files) as a GitHub release asset for partiql.github.io.
- Wasm smoke test (`tests/smoke.mjs`), run in CI.

### Fixes
- Correlated subqueries and `GROUP BY` with aggregates no longer panic.

## [0.2.0] - 2023-01-10
### Changed
- Updated to use partiql-parser 0.2.*

### Added
- Moves the project to a Node.js project
- Adds the capability for exporting the playground session on client side to be able to get fetched from other playground windows.
- Adds a REST API and exposes `/parse` for parsing the query over http request.
- Containerization using Docker.

### Fixes
- Fixes the bug with AST graph PAN and ZOOM—before this change the pan and zoom was quite flaky and very hard to work with.
- Fixes the version value for the session and JSON output by ensuring it gets picked from the selected version in the UI.

## [0.1.0] - 2022-08-05
### Added
- PartiQL Playground proof of concept (POC)

[Unreleased]: https://github.com/partiql/partiql-rust-playground/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/partiql/partiql-rust-playground/releases/tag/v0.2.0
