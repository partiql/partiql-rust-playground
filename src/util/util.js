import init, {decode_session_as_array, generate_session} from "../../pkg-web";

export async function encodeSession(query, env) {
    return await init()
        .then(() => {
            let q = ''
            if (query) {
                q = query
            }
            let e = ''
            if (env) {
                e = env
            }

            return generate_session(q, e)
        })
}


export async function decodeSession(session) {
    const param = await init()
        .then(() => {
            return decode_session_as_array(session)
        })

    return new Promise((resolve, reject) => {
            if (param.length === 1) {
                reject(param[0])
            } else if (param.length === 2) {

                let newParam = []
                param.forEach(p => {
                    if (p) {
                        newParam.push(p)
                    } else {
                        newParam.push(null)
                    }
                })
                resolve(newParam)
            } else {
                reject("Error decode session")
            }
        }
    )
}