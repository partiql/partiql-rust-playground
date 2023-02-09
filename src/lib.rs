use partiql_parser::{Parser, ParserResult};
use partiql_logical as logical;
use partiql_logical_planner::lower;
use partiql_eval as eval;
use partiql_eval::env::basic::MapBindings;
use partiql_value::ion::parse_ion;

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
/// Parses the given query and returns the json serialized String.
pub fn parse_to_str_result(query: &str) -> String {
    let parser = Parser::default();
    let res = parser.parse(query);
    match res {
        Ok(r) => serde_json::to_string_pretty(&r).unwrap(),
        Err(e) => serde_json::to_string_pretty(&e).unwrap(),
    }
}

/// Evaluates the given query using the given environment.
#[wasm_bindgen]
pub fn eval_stmt(statement: &str, env: &str) -> String {
    let parsed = parse(statement);
    let lowered = lower(&parsed.expect("parse"));
    let env_as_value = parse_ion(env);
    let bindings: MapBindings<partiql_value::Value> = MapBindings::from(env_as_value);
    let out = evaluate(lowered, bindings);
    format!("{:?}", out)
}

#[wasm_bindgen]
pub fn explain(statement: &str) -> String {
    let parsed = parse(statement);
    let lowered = lower(&parsed.expect("parse"));
    format!("{lowered}")
}

pub(crate) fn parse(statement: &str) -> ParserResult {
    Parser::default().parse(statement)
}

pub(crate) fn evaluate(
    logical: logical::LogicalPlan<logical::BindingsOp>,
    bindings: MapBindings<partiql_value::Value>,
) -> partiql_value::Value {
    let planner = eval::plan::EvaluatorPlanner;

    let mut plan = planner.compile(&logical);

    if let Ok(out) = plan.execute_mut(bindings) {
        out.result
    } else {
        partiql_value::Value::Missing
    }
}