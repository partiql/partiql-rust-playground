import {Stack, Typography} from "@mui/material";
import {Editor} from "../Editor/Editor";
import AppContext from "../../store/app-context";
import {useContext, useEffect, useState} from "react";

function EvalResponse(props) {

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
                    display: 'flex',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                }}>
                Result </Typography>
            <Editor tag="result" value={res} height={props.height}/>
        </Stack>
    )
}

export default EvalResponse
