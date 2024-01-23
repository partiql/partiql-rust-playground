use base64::Engine;
use base64::prelude::BASE64_URL_SAFE;
use ion_rs::ion_struct;
use ion_rs::element::Element;

pub(crate) fn encode_session(query: &str, env: &str) -> Result<String, String> {
    let ion_struct: Element = ion_struct! {
        "query" : query,
        "env" : env
    }.into();

    match ion_struct.to_binary() {
        Ok(b) => { Ok(BASE64_URL_SAFE.encode(b)) }
        Err(_) => { Err("Error Converting the ion data into binary".to_string()) }
    }
}


pub(crate) fn decode_session(session: &str) -> Result<[String; 2], String> {
    let error_prefix = "Error decoding session data: ";
    let binary = match BASE64_URL_SAFE.decode(session) {
        Ok(d) => { Ok(d) }
        Err(_e) => { Err(format!("{error_prefix}Not a valid base64 encoded string")) }
    }?;
    let ion = Element::read_one(binary);
    let ion_struct = if ion.is_ok() {
        let ion_value = ion.unwrap();
        let struct_value = ion_value.as_struct();
        match struct_value {
            None => { Err(format!("{error_prefix}Not a valid ion struct")) }
            Some(s) => { Ok(s.clone()) }
        }
    } else { Err(format!("{error_prefix}Malformed ion data")) }?;

    let query = ion_struct
        .get("query")
        .ok_or(format!("{error_prefix}No query field"))?
        .as_string()
        .ok_or(format!("{error_prefix}query not a string"))?
        .to_string();
    let env = ion_struct
        .get("env")
        .ok_or(format!("{error_prefix}No env field"))?
        .as_string()
        .ok_or(format!("{error_prefix}env not a string"))?
        .to_string();

    Ok([query, env])
}