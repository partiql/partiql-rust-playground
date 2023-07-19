import {Alert, Box, Button, Modal, Typography} from "@mui/material";
import React, {useContext} from "react";
import AppContext from "../../store/app-context";
import {useLocation, useSearchParams} from "react-router-dom";
import {encodeSearchParams} from "../../util/util";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function ExportModal(props) {
    const appContext = useContext(AppContext);
    const [open, setOpen] = React.useState(appContext.showModal);
    const location = useLocation()
    const handleClose = () => {
        setOpen(false);
        appContext.setShowModal(false)
    }

    function setUrl() {
        const str = window.location.href,
            rest = str.substring(0, str.lastIndexOf("/"))

        let params = {}
        if (props.env !== undefined) {
            params['env'] = props.env
        }
        if (props.query !== undefined) {
            params['query'] = props.query
        }
        return rest + location.pathname + "?session=" + encodeSearchParams(params)
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Alert severity="warning">Do not use the link to store data. </Alert>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ wordWrap: "break-word" }}>
                        {setUrl()}
                    </Typography>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(setUrl())
                            handleClose()
                        }}
                    >
                        Copy
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
