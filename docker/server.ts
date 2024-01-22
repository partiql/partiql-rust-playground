const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const partiql = require('../pkg-node/partiql_playground');

const app = express();
const port = 8000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.post('/parse', (req, res) => {
    res.status(200)
        .json(JSON.stringify(JSON
            .parse(partiql.parse_as_json(req.body.query)
            )
        ));
});

router.post('/explain', (req, res) => {
    res.status(200)
        .json(JSON.stringify(JSON
            .parse(partiql.explain_as_json(req.body.query)
            )
        ));
});

router.post('/eval', (req, res) => {
    res.status(200)
        .json(JSON.stringify(JSON
            .parse(partiql.eval_as_json(req.body.query, req.body.env))
        ));
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});