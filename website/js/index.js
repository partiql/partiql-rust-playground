import {init} from "./app/rust-playground";
import "../static/css/bootstrap-4.4.1.css"
import "../static/css/partiql-playground.css"
import "../static/css/jquery.json-viewer.css"
import {openNewUrlWindow, copyUrlClip, copyToClip, openNewWindow, copyRawJsonToClip } from "./app/utils"

window.openNewUrlWindow = openNewUrlWindow
window.copyUrlClip = copyUrlClip
window.copyToClip = copyToClip
window.openNewWindow = openNewWindow
window.copyRawJsonToClip = copyRawJsonToClip

init()
