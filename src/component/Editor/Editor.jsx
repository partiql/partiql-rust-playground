import * as React from "react";
import {useContext} from "react";
import "ace-builds";
import "ace-builds/src-noconflict/mode-partiql";
import 'brace/theme/tomorrow_night'
import AceEditor from "react-ace";
import {Box, Stack, Typography} from "@mui/material";
import AppContext from "../../store/app-context";
import {EDITOR_TAG} from "../../const";

export function Editor(props) {
    const appContext = useContext(AppContext);

    function handleChange(value) {
        if (props.tag === EDITOR_TAG.ENV) {
            appContext.changeEnv(value !== '' ? value : null)
        } else {
            appContext.changeQuery(value !== '' ? value : null)
        }
    }

    function getPlaceHolder(tag) {
        if (props.tag === EDITOR_TAG.QUERY) {
            return "SELECT * FROM env"
        } else {
            return "{ 'env' : <<1,2,3>> }"
        }
    }

    return (
        <Stack direction="column" height={props.height - 35} width='100%'>
            {(props.tag !== "result") &&
                <Typography
                    sx={{
                        ml: 1,
                        mb: 1,
                        display: 'flex',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit'
                    }}>
                    {props.tag}
                </Typography>}
            <Box sx={{flexGrow: 1}}>
                <AceEditor
                    mode="partiql"
                    theme="tomorrow_night"
                    placeholder={(() => {
                        if (props.value == null) {
                            return getPlaceHolder(props.tag)
                        } else {
                            return null
                        }
                    })()}
                    width='100%'
                    height='100%'
                    position='absolute'
                    fontSize={16}
                    showGutter={true}
                    style={{margin: 2, zIndex: 0}}
                    value={(() => {
                        if (props.value == null) {
                            return null
                        } else {
                            return props.value
                        }
                    })()}
                    highlightActiveLine={true}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        showLineNumbers: true, tabSize: 2, readOnly: props.tag === "result"
                    }}
                    onChange={(value) => handleChange(value)}
                />
            </Box>
        </Stack>)
}
