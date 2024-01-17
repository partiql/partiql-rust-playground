use js_sys::Array;
use partiql_eval as eval;
use partiql_eval::env::basic::MapBindings;
use partiql_logical as logical;
use partiql_logical_planner::lower;
use partiql_parser::{Parsed, Parser, ParserResult};
use partiql_value::Value;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::wasm_bindgen;

use encode::{decode_session, encode_session};

use crate::pretty::PrettyPrint;

mod pretty;
mod encode;

#[wasm_bindgen]
pub fn generate_session(query: &str, env: &str) -> String {
    match encode_session(query, env) {
        Ok(s) => s,
        Err(e) => e
    }
}

#[wasm_bindgen]
pub fn decode_session_as_array(session: &str) -> Array {
    match decode_session(session) {
        Ok(s) => s.iter().map(JsValue::from).collect(),
        Err(e) => [e].iter().map(JsValue::from).collect()
    }
}

#[wasm_bindgen]
/// Parses the given query and returns the json serialized string.
pub fn parse_as_json(query: &str) -> String {
    match parse(sanitize(query)) {
        Ok(p) => serde_json::to_string_pretty(&p).expect("Error in unwrapping json serde"),
        Err(e) => serde_json::to_string_pretty(&e).expect("Error in unwrapping json serde"),
    }
}

/// Evaluates the given query using the given environment and returns the json serialized string.
#[wasm_bindgen]
pub fn eval_as_json(statement: &str, env: &str) -> String {
    let parsed = parse(sanitize(statement));
    match parsed {
        Ok(p) => {
            serde_json::to_string_pretty(&eval(&p, env)).expect("Error in unwrapping json serde")
        }
        Err(e) => serde_json::to_string_pretty(&e).expect("Error in unwrapping error"),
    }
}

/// Evaluates the given query using the given environment and returns the output string.
#[wasm_bindgen]
pub fn eval_as_string(statement: &str, env: &str) -> String {
    let parsed = parse(sanitize(statement));
    match parsed {
        Ok(p) => {
            let value = eval(&p, env);
            match value {
                Ok(v) => {
                    let mut pretty = String::new();
                    let res = v.pretty(&mut pretty);
                    match res {
                        Ok(..) => pretty,
                        Err(e) => format!("{:?}", e)
                    }
                }
                Err(e) => format!("{:?}", e)
            }
        }
        Err(e) => format!("{:?}", e)
    }
}

pub(crate) fn parse(statement: &str) -> ParserResult {
    Parser::default().parse(statement)
}

fn eval(p: &Parsed, env: &str) -> Result<Value, String> {
    let lowered = lower(p);
    let env_as_value = get_bindings(env);
    match env_as_value {
        Ok(bindings) => Ok(evaluate(lowered, bindings)),
        Err(e) => Err(format!("{:?}", e))
    }
}


fn get_bindings(env: &str) -> Result<MapBindings<Value>, String> {
    let parsed = parse(env);
    match parsed {
        Ok(p) => {
            let lowered = lower(&p);
            let res = evaluate(lowered, MapBindings::default());
            match res {
                Value::Tuple(t) => Ok(MapBindings::from(*t)),
                _ => Err("Error in Env; Expected a struct containing the input environment".to_string())
            }
        }
        Err(e) => Err(format!("{:?}", e))
    }
}

/// Creates a logical plan for the given query and returns the json serialized string.
#[wasm_bindgen]
pub fn explain_as_json(statement: &str) -> String {
    let parsed = parse(sanitize(statement));
    let lowered = lower(&parsed.expect("Error in unwrapping json serde"));
    serde_json::to_string_pretty(&format!("{:?}", lowered)).expect("Error in unwrapping json serde")
}

/// Creates a logical plan for the given query and returns the output string.
#[wasm_bindgen]
pub fn explain_as_string(statement: &str) -> String {
    let parsed = parse(sanitize(statement));
    let lowered = lower(&parsed.expect("Error in unwrapping parsed statement"));
    format!("{lowered}")
}

fn evaluate(
    logical: logical::LogicalPlan<logical::BindingsOp>,
    bindings: MapBindings<Value>,
) -> Value {
    let planner = eval::plan::EvaluatorPlanner;

    let mut plan = planner.compile(&logical);

    if let Ok(out) = plan.execute_mut(bindings) {
        out.result
    } else {
        Value::Missing
    }
}

fn sanitize(query: &str) -> &str {
    let trimmed = query.trim();
    let last = trimmed.chars().last();
    match last {
        None => trimmed,
        Some(l) => {
            if l == ';' {
                &trimmed[..trimmed.len() - 1]
            } else {
                trimmed
            }
        }
    }
}
