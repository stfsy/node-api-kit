export default ({ send, json, statusCode } = {}) => {
    const eventHandlers = {
        'finish': []
    }
    const headers = {}
    const cookies = {}
    let _statusCode = null
    return {
        // api
        cookie: (key, value) => { cookies[key] = value },
        end: () => { },
        send,
        json,
        status: (status) => { _statusCode = status; return { send, json, contentType: () => { return { send, json } } } },
        statusCode,
        removeHeader: () => { },
        getHeader: (key) => headers[key],
        setHeader: (key, value) => { headers[key] = value },
        on: (event, handler) => { eventHandlers[event].push(handler) },

        // test helper
        _status: () => _statusCode,
        _headers: headers,
        _cookies: () => cookies,
        _trigger: (event) => {
            eventHandlers[event].forEach(handler => handler.call())
        }
    }
}