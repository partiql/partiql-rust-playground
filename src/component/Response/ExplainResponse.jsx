import {Stack, TextField, Typography} from "@mui/material";
import AppContext from "../../store/app-context";
import * as React from "react";
import {useContext, useEffect, useState} from "react";

function ExplainResponse() {
    const appContext = useContext(AppContext);
    const [res, setRes] = useState(appContext.result);

    useEffect(() => {
        setRes(appContext.result)
    }, [appContext.result])

    return (
        <Stack>
            <Typography
                sx={{
                    ml: 1,
                    mb: 1,
                    display: {xs: 'none', md: 'flex'},
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit'
                }}>
                Result </Typography>
            <TextField
                defaultValue={res}
                style={{height: 500}}
                multiline
                row={4}
                maxRows={Infinity}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
        </Stack>)
}

export default ExplainResponse
