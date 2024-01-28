import { PUBLIC_API_ADDRESS } from "$env/static/public"

/**
 * Short hand for this function down here
 * @example
 * fetch(PUBLIC_API_ADDRESS + route, {
        credentials: "include",
        mode: 'cors',
        method
    }).then(res=>res)
 * @param route 
 * @param method 
 * @returns Promise of Response from the server
 */
export async function _fetch(route: string, body: any = null, method: string = "GET"): Promise<Response> {
    const options: RequestInit = {
        credentials: "include",
        mode: 'cors',
        method,
    }
    if (method != "GET" && body) {
        options.body = JSON.stringify(body)
    }
    return fetch(PUBLIC_API_ADDRESS + route, options).then(res=>res)
}