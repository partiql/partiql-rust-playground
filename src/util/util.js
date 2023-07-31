import {dumpText, load} from "ion-js";

export function encodeSearchParams(params) {
    const searchParam = {}

    for (let [name, value] of Object.entries(params)) {
        searchParam[`${name}`] = encodeURIComponent(value)
    }

    let ionData = load(JSON.stringify(searchParam))

    return btoa(dumpText(ionData))
}

export function decodeSearchParams(params) {
    const rawIon = atob(params)
    const struct = load(rawIon)
    const searchParam = {}

    for (let [name, value] of struct) {
        searchParam[`${name}`] = decodeURIComponent(value.stringValue())
    }
    return searchParam
}
