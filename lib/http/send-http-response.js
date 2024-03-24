import { encode as encodeHtml } from "html-entities"
import { apiHostname, cookiePrefix, jsonSerializerPrivatePropertyPrefix } from '../configuration/service.js'
import * as _types from '../types.js'

const jsonSkipPropertyPrefix = jsonSerializerPrivatePropertyPrefix()
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
function needsPrettyResponse({ query } = {}) {
    return query?.pretty === 'true'
}

/**
 * @private
 * @param {Object} body 
 * @param {Number} space 
 * @param {boolean} encode
 * @returns 
 */
function stringify(body, space, encode) {
    if (!body) {
        return ''
    }
    return JSON.stringify(body, (key, value) => {
        if (key.startsWith(jsonSkipPropertyPrefix) && key !== '_links') {
            return undefined
        } else {
            if (encode && key && typeof value === 'string') {
                return encodeHtml(value)
            } else {
                return value
            }
        }
    }, space)
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
 * @typedef SendResponseOptions
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
 * @module sendResponse
 * @param {SendResponseOptions} responseOptions
 */
export function sendResponse({ req, res, body, cookies, links, status = 200 }) {
    if (links) {
        body = Object.assign({}, body, { _links: links })
    }

    addCookies(res, cookies)
    const space = needsPrettyResponse(req) ? 2 : 0
    // this property will be set by responseEncoder if encoding was enabled
    const encode = res?._apiKit?.response?.encode
    const json = stringify(body, space, encode)

    res.status(status)
        .contentType('application/json')
        .send(json)
}
