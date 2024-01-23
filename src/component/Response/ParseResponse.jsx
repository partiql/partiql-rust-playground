import {Box, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import AppContext from "../../store/app-context";
import {PARSE_OPTION} from "../../const";
import ReactJson from "react-json-view";
import AstGraph from "../Util/AstGraph";

export function ParseResponse(props) {
    const [parseOption, setParseOption] = React.useState(PARSE_OPTION["JSON AST"]);

    const appContext = useContext(AppContext);

    const [res, setRes] = useState(appContext.result);

    useEffect(() => {
        setRes(appContext.result)
    }, [appContext.result])


    const handleChange = (event, parseOption) => {
        setParseOption(parseOption)
    };

    function jsonViewer() {
        return <ReactJson src={JSON.parse(res)}
                          theme="tomorrow"/>
    }

    function rawJsonViwer() {
        return <TextField
            defaultValue={JSON.stringify(JSON.parse(res))}
            multiline
            row={4}
            maxRows={Infinity}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
        />
    }

    function graphViewer() {
        const parsed = JSON.parse(res)
        if (parsed.ast !== undefined) {
            return (<AstGraph jsonString={JSON.stringify(JSON.parse(res).ast)}
                              style={{
                                  position: "relative", top: 0, left: 0, width: "100%", height: "500", overflow: "auto"
                              }}
            />)
        } else {
            return (<TextField
                defaultValue="Error in the query"
                fullWidth
                InputProps={{
                    readOnly: true,
                }}/>)
        }
    }

    return (<Stack>
            <Grid container justifyContent="space-around"
                  alignItems="center">
                <Grid item xs={0} md={2}>
                    <Typography
                        sx={{
                            ml: 1,
                            mb: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit'
                        }}>
                        Result </Typography>
                </Grid>
                <Grid item xs={12} md={10}>
                    <ToggleButtonGroup
                        color="primary"
                        sx={{padding: "0px", mr: 2}}

                        value={parseOption}
                        exclusive
                        onChange={handleChange}
                        aria-label="Display-Option"
                    >
                        {Object.entries(PARSE_OPTION)
                            .map(([name, value]) => (<ToggleButton
                                value={value}
                            >
                                {name}
                            </ToggleButton>))})
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Box sx={{height: props.height, overflow: "scroll"}}>
                {parseOption === PARSE_OPTION["JSON AST"] && jsonViewer()}
                {parseOption === PARSE_OPTION["AST GRAPH"] && graphViewer()}
                {parseOption === PARSE_OPTION["AST RAW JSON"] && rawJsonViwer()}
            </Box>
        </Stack>
    )
}
