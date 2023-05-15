pub mod pretty;

extern crate core;

use partiql_eval as eval;
use partiql_eval::env::basic::MapBindings;
use partiql_eval::eval::Evaluated;
use partiql_eval::eval::EvalErr;
use partiql_logical as logical;
use partiql_logical_planner::lower;
use partiql_parser::{Parsed, Parser, ParserResult};
use partiql_value::Value;
use crate::pretty::PrettyPrint;

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
/// Parses the given query and returns the json serialized string.
pub fn parse_as_json(query: &str) -> String {
    let parser = Parser::default();
    let res = parser.parse(query);
    match res {
        Ok(p) => serde_json::to_string_pretty(&p).expect("Error in unwrapping json serde"),
        Err(e) => serde_json::to_string_pretty(&e).expect("Error in unwrapping json serde"),
    }
}

/// Evaluates the given query using the given environment and returns the output string.
#[wasm_bindgen]
pub fn eval_as_string(statement: &str, env: &str) -> String {
    let bindings = get_bindings(env);
    match bindings {
        Ok(b) => {
            let res = evaluate(statement, b);
            match res {
                Ok(r) => {
                    let mut pretty_evaluated = String::new();
                    r.result.pretty(&mut pretty_evaluated).expect("pretty printing error");
                    format!("{pretty_evaluated}")
                }
                Err(e) => {
                    format!("{:?}", e.errors)
                }
            }
        }
        Err(e) => {
            format!("{:?}", e)
        }
    }
}

pub(crate) fn parse(statement: &str) -> ParserResult {
    Parser::default().parse(statement)
}

/// Creates a logical plan for the given query and returns the output string.
#[wasm_bindgen]
pub fn explain_as_string(statement: &str) -> String {
    let parsed = parse(statement);
    let lowered = lower(&parsed.expect("Error in unwrapping parsed statement"));
    format!("{lowered}")
}

fn evaluate(query: &str, globals: MapBindings<Value>) -> Result<Evaluated, EvalErr> {
    let parsed = parse(query);
    let lowered = partiql_logical_planner::lower(&parsed.expect("Error in unwrapping parsed statement"));
    let mut plan = partiql_eval::plan::EvaluatorPlanner.compile(&lowered);
    plan.execute_mut(globals)
}

fn get_bindings(env: &str) -> Result<MapBindings<Value>, String> {
    let res = evaluate(env, MapBindings::default());
    match res {
        Ok(r) => {
            // match b.result
            // Value::Tuple(t) => OK(MapBindings::from(*t)),
            let value = r.result;
            match value {
                Value::Tuple(t) => Ok(MapBindings::from(*t)),
                _ => Err("Error in Env; Expected a struct containing the input environment".to_string())
            }
        }
        _ => Err("Error in Env".to_string())
    }
}