import { apiHostname, cookiePrefix } from '../configuration/service.js'
import * as _types from '../types.js'

const apiHostnameValue = apiHostname()
const cookiePrefixValue = cookiePrefix()

/**
 * @private
 */
const COOKIE_OPTIONS = {
    encode: false,
    httpOnly: true,
    expires: 0,
    path: '/',
    secure: apiHostnameValue.startsWith('https'),
    sameSite: 'strict'
}

/**
 * @private
 * @param {_types.Request} param0 
 * @returns 
 */
function needsPrettyResponse({ query }) {
    return query?.pretty === 'true'
}

/**
 * @private
 * @param {Object} body 
 * @param {Number} space 
 * @returns 
 */
function stringify(body, space) {
    if (!body) {
        return ''
    }
    return JSON.stringify(body, null, space)
}

/**
 * @private
 * @param {_types.Response} res 
 * @param {Object} cookies 
 */
function addCookies(res, cookies) {
    cookies && Object.entries(cookies).forEach(([key, value]) => {
        res.cookie(`${cookiePrefixValue}-${key}`, value, COOKIE_OPTIONS)
    })
}

/**
 * @name SendOkOptions
 * @typedef SendOkOptions
 * @property {_types.Request} req the http request
 * @property {_types.Response} res the http response
 * @property {Object} [body=null] the response body to be sent to the client
 * @property {Object} [cookies=null] the response cookies to be sent to the client
 * @property {Object} [links=null] the hateoas links to be added to the response as _links
 */

/**
 * Send the response to the client and closes the response object. 
 * By default, will respond with status code 200.
 * 
 * @example
 * import { sendOk } from './http/send-http-ok.js'
 * 
 * sendOk({
 *   req, req, status = 200, body: {
 *     customer_id: 4815162342
 *   }
 * })
 * 
 * @module sendOk
 * @param {SendOkOptions} responseOptions
 */
export function sendOk({ req, res, body, cookies, links, status = 200 }) {
    if (links) {
        body = Object.assign({}, body, { _links: links })
    }

    addCookies(res, cookies)
    const space = needsPrettyResponse(req) ? 2 : 0
    const json = stringify(body, space)

    res.status(status)
        .contentType('application/json')
        .send(json)
}
