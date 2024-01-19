import {Navigate, Route, Routes} from 'react-router-dom';
import React from "react";

import EvalPage from "./pages/Eval";
import ExplainPage from "./pages/Explain";
import ParsePage from "./pages/Parse";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

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
                <Route path='/' element={<Navigate to='/evaluate'/>}/>
                <Route path='/parse' element={<ParsePage/>}/>
                <Route path='/explain' element={<ExplainPage/>}/>
                <Route path='/evaluate' element={<EvalPage/>}/>
            </Routes>
        </ThemeProvider>
    </ React.StrictMode>
}

export default App;
