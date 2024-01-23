import {Editor} from "../component/Editor/Editor";
import SplitPane from "react-split-pane";
import '../css/splitPane.css'
import {EDITOR_TAG, OPERATION} from "../const";
import EvalResponse from "../component/Response/EvalResponse";
import React, {useContext, useEffect, useRef, useState} from "react";
import AppContext from "../store/app-context";
import {useLocation} from "react-router-dom";
import {decodeSession} from "../util/util";
import Topbar from "../component/Layout/Topbar";
import {Alert, Box} from "@mui/material";
import {ExportModal} from "../component/Modal/ExportModal";

function EvalPage() {

    const appContext = useContext(AppContext);
    const location = useLocation();
    const evalRef = useRef();
    const [editorTopHeight, setEditorTopHeight] = useState(0);
    const [editorBottomHeight, setEditorBottomHeight] = useState(0);
    const [availableHeight, setAvailableHeight] = useState(0)

    useEffect(() => {
        const availableSpace = evalRef.current.offsetHeight / 2
        setAvailableHeight(evalRef.current.offsetHeight)
        setEditorTopHeight(availableSpace)
        setEditorBottomHeight(availableSpace)
        const searchParam = location.search
        if (searchParam === '') return
        const session = new URLSearchParams(searchParam).get("session")
        decodeSession(session).then((params) => {
            appContext.changeQuery(params[0])
            appContext.changeEnv(params[1])
        }).catch((error) => {
            appContext.changeQuery(error)
        })
    }, [])

    function noResponseState() {
        return (<div ref={evalRef} style={{height: "100%"}}>
            <SplitPane
                split="horizontal"
                style={{position: "relative"}}
                minSize={100}
                defaultSize={"50%"}
                onChange={(size) => {

                    setEditorTopHeight(size)
                    setEditorBottomHeight(availableHeight - size)
                }}>
                <Editor tag={EDITOR_TAG.QUERY} value={appContext.query} height={editorTopHeight}/>
                <Editor
                    tag={EDITOR_TAG.ENV}
                    value={appContext.env}
                    height={editorBottomHeight}/>
            </SplitPane>
        </div>)
    }

    function withResponseState() {
        return (<SplitPane split="vertical"
                           style={{position: "relative"}}
                           minSize={100}
                           defaultSize={"50%"}
        >
            <div ref={evalRef} style={{height: "100%"}}>
                <SplitPane
                    split="horizontal"
                    style={{position: "relative"}}
                    minSize={100}
                    defaultSize={"50%"}
                    onChange={(size) => {
                        setEditorTopHeight(size)
                        setEditorBottomHeight(evalRef.current.offsetHeight - size)
                    }}>
                    <Editor tag={EDITOR_TAG.QUERY} value={appContext.query} height={editorTopHeight}/>
                    <Editor
                        tag={EDITOR_TAG.ENV}
                        value={appContext.env}
                        height={editorBottomHeight}/>
                </SplitPane>
            </div>
            <EvalResponse height={evalRef.current.offsetHeight}/>
        </SplitPane>)
    }

    return (
        <Box sx={{
            width: "100%", height: "100%", display: 'flex',
            flexDirection: 'column'
        }}
        >
            <Alert severity="warning" sx={{mb: 1}}>The sandbox is in the experimental stage. </Alert>
            <Topbar op={OPERATION.EVAL}></Topbar>
            <Box sx={{width: "100%", height: "100%", mt: 2}}>
                {appContext.needResponse === false ? noResponseState() : withResponseState()}
            </Box>
            {appContext.showModal && <ExportModal query={appContext.query} env={appContext.env}/>}
        </Box>
    )
}

export default EvalPage;
