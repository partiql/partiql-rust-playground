use std::fmt::Display;

use js_sys::Array;
use partiql_catalog::catalog::{PartiqlCatalog, PartiqlSharedCatalog};
use partiql_catalog::context::SystemContext;
use partiql_eval::env::basic::MapBindings;
use partiql_eval::eval::BasicContext;
use partiql_eval::plan::{EvaluationMode, EvaluatorPlanner};
use partiql_logical as logical;
use partiql_logical_planner::LogicalPlanner;
use partiql_parser::{Parsed, Parser, ParserResult};
use partiql_value::{DateTime, Value};
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
                Err(e) => e
            }
        }
        Err(e) => format!("{:?}", e)
    }
}

pub(crate) fn parse(statement: &str) -> ParserResult<'_> {
    Parser::default().parse(statement)
}

thread_local! {
    // The built-in function catalog; immutable, so built once.
    static CATALOG: PartiqlSharedCatalog = PartiqlCatalog::default().to_shared_catalog();
}

/// Joins a list of errors into one message, prefixed with the phase in which they occurred.
fn errors_to_string<E: Display>(phase: &str, errors: &[E]) -> String {
    let msgs: Vec<String> = errors.iter().map(ToString::to_string).collect();
    format!("{phase} Error: {}", msgs.join("; "))
}

fn lower(
    catalog: &PartiqlSharedCatalog,
    parsed: &Parsed<'_>,
) -> Result<logical::LogicalPlan<logical::BindingsOp>, String> {
    LogicalPlanner::new(catalog)
        .lower(parsed)
        .map_err(|e| errors_to_string("Planning", &e.errors))
}

fn eval(p: &Parsed<'_>, env: &str) -> Result<Value, String> {
    CATALOG.with(|catalog| {
        let bindings = get_bindings(catalog, env)?;
        let lowered = lower(catalog, p)?;
        evaluate(catalog, lowered, bindings)
    })
}

fn get_bindings(catalog: &PartiqlSharedCatalog, env: &str) -> Result<MapBindings<Value>, String> {
    let error_prefix = "Error in Env";
    let parsed = parse(env).map_err(|e| format!("{error_prefix}: {:?}", e.errors))?;
    let lowered = lower(catalog, &parsed).map_err(|e| format!("{error_prefix}: {e}"))?;
    let res = evaluate(catalog, lowered, MapBindings::default())
        .map_err(|e| format!("{error_prefix}: {e}"))?;
    match res {
        Value::Tuple(t) => Ok(MapBindings::from(*t)),
        _ => Err(format!("{error_prefix}; Expected a struct containing the input environment"))
    }
}

/// Creates a logical plan for the given query and returns the json serialized string.
#[wasm_bindgen]
pub fn explain_as_json(statement: &str) -> String {
    let plan = explain(statement).map(|lowered| format!("{:?}", lowered));
    serde_json::to_string_pretty(&plan).expect("Error in unwrapping json serde")
}

/// Creates a logical plan for the given query and returns the output string.
#[wasm_bindgen]
pub fn explain_as_string(statement: &str) -> String {
    match explain(statement) {
        Ok(lowered) => format!("{lowered}"),
        Err(e) => e,
    }
}

fn explain(statement: &str) -> Result<logical::LogicalPlan<logical::BindingsOp>, String> {
    let parsed = parse(sanitize(statement)).map_err(|e| format!("{:?}", e.errors))?;
    CATALOG.with(|catalog| lower(catalog, &parsed))
}

fn evaluate(
    catalog: &PartiqlSharedCatalog,
    logical: logical::LogicalPlan<logical::BindingsOp>,
    bindings: MapBindings<Value>,
) -> Result<Value, String> {
    let mut planner = EvaluatorPlanner::new(EvaluationMode::Permissive, catalog);
    let plan = planner
        .compile(&logical)
        .map_err(|e| errors_to_string("Planning", &e.errors))?;

    let sys = SystemContext {
        now: DateTime::from_system_now_utc(),
    };
    let ctx = BasicContext::new(bindings, sys);
    plan.execute(&ctx)
        .map(|out| out.result)
        .map_err(|e| errors_to_string("Evaluation", &e.errors))
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
