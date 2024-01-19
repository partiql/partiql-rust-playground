import {createContext, useState} from "react";
import {OPERATION} from "../const";

const AppContext = createContext({
    op: OPERATION.EVAL,
    env: null,
    query: null,
    result: null,
    needResponse: false,
    showModal: false,
    changeOp: (op) => {
    },
    changeEnv: (env) => {
    },
    changeQuery: (query) => {
    },
    changeResult: (result) => {
    },
    setNeedResponse: (value) => {
    },
    setShowModal: (value) => {
    },
    resetOp: (op) => {
    },
    resetEnv: () => {
    },
    resetQuery: () => {
    }
});


export function AppContextProvider(props) {
    const [op, setOp] = useState(OPERATION.EVAL)
    const [env, setEnv] = useState(null)
    const [query, setQuery] = useState(null)
    const [result, setResult] = useState(null)
    const [needResponse, setNeedResponse] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function changeOpHandler(op) {
        setOp(op)
    }

    function changeEnvHandler(env) {
        setEnv(env)
    }

    function changeQueryHandler(query) {
        setQuery(query)
    }

    function changeResultHandler(result) {
        setResult(result)
    }

    function setNeedResponseHandle(value) {
        setNeedResponse(value)
    }

    function setShowModalHandle(value) {
        setShowModal(value)
    }


    function resetQueryHandle() {
        setQuery(null)
    }

    function resetEnvHandle() {
        setEnv(null)
    }

    function resetOpHandle(op) {
        changeOpHandler(op)
        setEnv(null)
        setResult(null)
        setNeedResponse(false)
    }

    const context = {
        op: op,
        env: env,
        query: query,
        result: result,
        needResponse: needResponse,
        showModal: showModal,
        changeOp: changeOpHandler,
        changeEnv: changeEnvHandler,
        changeQuery: changeQueryHandler,
        changeResult: changeResultHandler,
        setNeedResponse: setNeedResponseHandle,
        setShowModal: setShowModalHandle,
        resetEnv: resetEnvHandle,
        resetQuery: resetQueryHandle,
        resetOp: resetOpHandle
    };

    return <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
}

export default AppContext

