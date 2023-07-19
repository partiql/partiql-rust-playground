import {Navigate, Route, Routes} from 'react-router-dom';
import React, {useContext, useEffect, useRef} from "react";

import EvalPage from "./pages/Eval";
import ExplainPage from "./pages/Explain";
import ParsePage from "./pages/Parse";
import Topbar from "./component/Layout/Topbar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Alert, Box, CssBaseline, Stack} from "@mui/material";
import {ExportModal} from "./component/Modal/ExportModal";
import AppContext from "./store/app-context";

function App(props) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Routes>
                <Route path='/' element={<Navigate to='/evaluate' />}/>
                <Route path='/parse' element={<ParsePage/>}/>
                <Route path='/explain' element={<ExplainPage/>}/>
                <Route path='/evaluate' element={<EvalPage/>}/>
            </Routes>
        </ThemeProvider>
    </ React.StrictMode>
}

export default App;
