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
        options.headers = {
            "Content-Type": "application/json"
        }
    }
    return fetch(PUBLIC_API_ADDRESS + route, options).then(res=>res)
}

const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "narrow"
})

let now = new Date()
setInterval(()=>{now = new Date()}, 1000)
export function timeSince(date: string) {
    let seconds = -Math.floor((new Date(date).getTime() - now.getTime())/1000)
    
    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
        return rtf.format(-interval, 'years')
    }
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
        return rtf.format(-interval, 'months')
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return rtf.format(-interval, 'days')
    }
    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
        return rtf.format(-interval, 'hours')
    }
    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
        return rtf.format(-interval, 'minutes')
    }
    return rtf.format(-Math.floor(seconds), "seconds");
}