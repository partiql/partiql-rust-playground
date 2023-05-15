use partiql_playground::eval_as_string;

#[test]
fn test_eval() {
    let env = "{'a' : <<1,2,3>>}";
    let query = "select * from a";
    let res = eval_as_string(query,env);
    assert_eq!(
        res,
        "<<\n  {\n    _1: 1\n  },\n  {\n    _1: 2\n  },\n  {\n    _1: 3\n  }\n>>"
    )
}