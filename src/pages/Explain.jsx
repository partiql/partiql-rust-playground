import React, {useContext, useEffect, useRef, useState} from "react";
import AppContext from "../store/app-context";
import {EDITOR_TAG, OPERATION} from "../const";
import {Editor} from "../component/Editor/Editor";
import ExplainResponse from "../component/Response/ExplainResponse";
import SplitPane from "react-split-pane";
import {Alert, Box} from "@mui/material";
import Topbar from "../component/Layout/Topbar";
import {ExportModal} from "../component/Modal/ExportModal";
import {decodeSession} from "../util/util";
import {useLocation} from "react-router-dom";

function ExplainPage() {
    const appContext = useContext(AppContext);
    const explainRef = useRef();
    const location = useLocation();
    const [editorHeight, setEditorHeight] = useState(0);

    useEffect(() => {
        const availableSpace = explainRef.current.offsetHeight
        setEditorHeight(availableSpace)
        const searchParam = location.search
        if (searchParam === '') return
        const session = new URLSearchParams(searchParam).get("session")
        decodeSession(session).then((params) => {
            appContext.changeQuery(params[0])
        }).catch((error) => {
            appContext.changeQuery(error)
        })
    }, [])

    function noResponseState() {
        return (
            <div ref={explainRef} style={{height: "100%"}}>
                <Editor tag={EDITOR_TAG.QUERY} value={appContext.query} height={editorHeight}/>
            </div>
        )
    }

    function withResponseState() {
        return (
            <div ref={explainRef} style={{height: "100%"}}>
                <SplitPane split="vertical" style={{position: "relative"}} minSize={100} defaultSize={"50%"}>
                    <Editor tag={EDITOR_TAG.QUERY} value={appContext.query} height={editorHeight}/>
                    <ExplainResponse/>
                </SplitPane>
            </div>
        )
    }


    return (
        <Box sx={{
            width: "100%", height: "100%", display: 'flex',
            flexDirection: 'column'
        }}
        >
            <Alert severity="warning" sx={{mb: 1}}>The sandbox is in the experimental stage. </Alert>
            <Topbar op={OPERATION.EXPLAIN}></Topbar>
            <Box sx={{width: "100%", height: "100%", mt: 2}}>
                {appContext.needResponse === false ? noResponseState() : withResponseState()}
            </Box>
            {appContext.showModal && <ExportModal query={appContext.query} env={appContext.env}/>}
        </Box>
    )
}

export default ExplainPage;
