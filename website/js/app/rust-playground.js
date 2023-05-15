import * as wasm from 'playground-rust/partiql_playground';
import {eval_as_string, explain_as_string, parse_as_json} from "playground-rust/partiql_playground";
import 'bootstrap'
import ace from 'ace-builds';
import 'jquery.json-viewer/json-viewer/jquery.json-viewer';
import {tabClick} from "./utils";
import {drawGraph} from './ast-graph'

await wasm;
export function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const session = {'query' : urlParams.get('query'), 'env': urlParams.get('env'), 'ver' : urlParams.get('ver')}

    const action = document.getElementById('action');
    const version = document.getElementById('ver');
    const btnExec = document.getElementById('btnExec');
    const btnGraphAst = document.getElementById('btnGraphAst');
    const btnJsonAst = document.getElementById('btnJsonAst');
    const btnRawJson = document.getElementById('btnRawJson');
    const copyToClipLabel = document.getElementById('copyToClip');

    const envDiv = document.getElementById('env-div');
    const evalResultDiv = document.getElementById('eval-result-div');
    const evalResult = document.getElementById('eval-result');
    const envData = document.getElementById('env-data');
    const graph = document.getElementById('graph');
    const rawjson = document.getElementById('raw-json')
    const resultArea = document.getElementById('result-area');

    const editor = ace.edit('editor');
    const partiql_mode = require("ace-builds/src-noconflict/mode-partiql").Mode;
    editor.session.setMode(new partiql_mode());

    btnExec.addEventListener('click', () => {
        run()
    });

    $('#exportModal').on('show.bs.modal', function () {
        $(this).find('.modal-body input').val(exportAsUrl());
        $(this).find('.modal-body input').attr('readonly', true);
    })

    action.addEventListener('change', () => {
        if (action.value === 'parse') {
            envDiv.style.display = 'none';
            evalResultDiv.style.display = 'none';
        } else if (action.value === 'eval') {
            evalResultDiv.style.display = 'none';
            resultArea.style.display = 'none';
            envDiv.style.display = 'block';
        } else if (action.value === 'explain') {
            evalResultDiv.style.display = 'none';
            resultArea.style.display = 'none';
            envDiv.style.display = 'none';
        }
    });

    btnJsonAst.addEventListener('click', (e) => tabClick(e, 'json'));
    btnGraphAst.addEventListener('click', (e) => tabClick(e, 'graph'));
    btnRawJson.addEventListener('click', (e) => tabClick(e, 'rawjson'));

    if (checkContainsNonNull(session)) {
        fetchSession(session)
    } else {
        cleanUp();
    }

    function exportAsUrl() {
        // replace " with \" to be able to correctly render sessions with queries like `SELECT "zone" FROM tbl AS a`.
        let envText = envData.value != null ? envData.value.replace(/\"/g, '\\\"') : "";
        let ver = version.value;
        // replace " with \" to be able to correctly render sessions with queries like `SELECT "zone" FROM tbl AS a`.
        let query = editor.getValue().replace(/\"/g, '\\\"');
        let encodedQuery = btoa(query)
        let encodedVer = btoa(ver)
        if (envText !== ""){
            let encodedEnv = btoa(envText)
            return `${window.location.href.split('?')[0]}?query=${encodedQuery}&env=${encodedEnv}&ver=${encodedVer}`;
        }
        return `${window.location.href.split('?')[0]}?query=${encodedQuery}&ver=${encodedVer}`;
    }

    // ignore version for now
    function fetchSession(session) {
        let query = atob(decodeURIComponent(session['query']));
        let env = session['env'] != null? atob(decodeURIComponent(session['env'])) : '';
        editor.setValue(query);

        action.value = 'eval';
        envDiv.style.display = 'block';
        envData.value = env;
    }

    function cleanUp() {
        action.value = 'eval';
        envDiv.style.display = 'block';
        copyToClipLabel.innerText = 'copy to clipboard';
        envData.value = '';
        evalResultDiv.value = '';
        resultArea.style.display = 'none';
    }

    /**
     * Exposes the entrypoint for execution based on the selected action.
     */
    function run() {
        if (action.value === 'parse') {
            const res = parse_as_json(editor.getValue());
            const resJson = JSON.parse(res);
            resJson.version = version.value;
            graph.innerHTML = '';

            $('#rendered-json').jsonViewer(resJson);

            rawjson.innerText = JSON.stringify(resJson);
            copyToClipLabel.innerText = 'copy to clipboard';
            resultArea.style.display = 'block';

            btnJsonAst.click();

            drawGraph(JSON.stringify(JSON.parse(res).ast));
        } else if (action.value === 'eval') {
            let envText = envData.value.trim() === '' ? 'null' : envData.value.replace(/\"/g, '\\\"');
            let env = envText;
            let result = eval_as_string(editor.getValue(), env)
            evalResultDiv.style.display = 'block';
            evalResult.innerHTML = result;
        } else if (action.value === 'explain') {
            evalResultDiv.style.display = 'block';
            evalResult.innerHTML = explain_as_string(editor.getValue());
        }
    }

    function checkContainsNonNull(obj){
        for (const [key, value] of Object.entries(obj)) {
            if(Boolean(value)){
                console.log(key + " is not null")
                return true
            }
        }
        return false
    }
}
