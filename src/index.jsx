import React from "react";
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './css/app.css'
import App from './App';

import {AppContextProvider} from "./store/app-context";

ReactDOM.render(
    <AppContextProvider>
        <HashRouter>
            <App/>
        </HashRouter>
    </AppContextProvider>,
    document.getElementById('root')
);
