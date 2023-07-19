import * as React from "react";
import {useContext, useEffect} from "react";

import {AppBar, Box, Button, Container, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SendIcon from '@mui/icons-material/Send';
import {useLocation, useNavigate} from "react-router-dom";
import {OPERATION} from "../../const";
import AppContext from "../../store/app-context";
import init, {eval_as_string, parse_as_json, explain_as_string} from "../../../pkg-web";


function Topbar(props) {
    const appContext = useContext(AppContext);
    const [op, setOp] = React.useState(props.op)
    const navigate = useNavigate()

    const opHandler = (event) => {
        setOp(event.target.value)
        if (appContext.op !== event.target.value) {
            appContext.resetOp(event.target.value)
            navigate(`/${event.target.value}`)
        }
    }

    const handleRun = () => {
        if (appContext.query == null) {
            return;
        }
        appContext.setNeedResponse(true)

        async function getResult() {
            const res = await init()
                .then(() => {
                    if (op === OPERATION.EVAL) {
                        return eval_as_string(normalizeQuery(appContext.query), normalizeEnv(appContext.env));
                    } else if (op === OPERATION.PARSE) {
                        return parse_as_json(normalizeQuery(appContext.query))
                    } else {
                        return explain_as_string(normalizeQuery(appContext.query))
                    }
                })
            appContext.changeResult(res)
        }

        getResult()
    }

    const handleExport = () => {
        appContext.setShowModal(true)
    }

    function normalizeQuery(data) {
        return data != null ? data.replace(/\"/g, '\\\"') : "";
    }

    function normalizeEnv(data) {
        return data != null ? data.replace(/\"/g, '\\\"') : "{}";
    }

    return (<AppBar elevation={0}
                    sx={{ bgcolor: "#121212" }}
                    position="relative">
        <Container maxWidth={false} style={{margin: 0}}>
            <Toolbar disableGutters>
                <Select
                    labelId="select-operation"
                    id="select-operation"
                    value={op}
                    onChange={opHandler}
                >
                    {Object.values(OPERATION).map((operation) => (<MenuItem
                        key={operation}
                        value={operation}
                    >
                        {operation.charAt(0).toUpperCase() + operation.slice(1)}
                    </MenuItem>))})
                </Select>
                <Box sx={{flexGrow: 1}}/>
                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        sx={{mr: 2}}
                        startIcon={<SendIcon/>}
                        onClick={handleRun}
                    >
                        Run
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadOutlinedIcon/>}
                        onClick={handleExport}
                    >Share</Button>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>)
}

export default Topbar;
