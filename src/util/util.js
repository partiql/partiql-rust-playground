import * as ion from 'ion-js'

export function encodeSearchParams(params) {
    let ionData = ion.load(JSON.stringify(params))
    return btoa(ion.dumpText(ionData))
}

export function decodeSearchParams(params) {
    const struct = ion.load(atob(params))
    const searchParam = {}

    for (let [name, value] of struct) {
        searchParam[`${name}`] = value.stringValue()
    }
    return searchParam
}
