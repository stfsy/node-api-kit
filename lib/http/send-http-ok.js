import * as _types from '../types.js'
import { sendResponse } from './send-http-response.js'

/**
 * @typedef SendOkOptions
 * @name SendOkOptions
 * @property {_types.Request} req the http request
 * @property {_types.Response} res the http response
 * @property {object} [body=null] the response body to be sent to the client
 * @property {object} [cookies=null] the response cookies to be sent to the client
 * @property {object} [links=null] the hateoas links to be added to the response as _links
 */

/**
 * Send the response to the client and closes the response object. 
 * By default, will respond with status code 200.
 * 
 * @module sendOk
 * @param {SendOkOptions} responseOptions
 * @example
 * import { sendOk } from './http/send-http-ok.js'
 * 
 * sendOk({
 *   req, req, status = 200, body: {
 *     customer_id: 4815162342
 *   }
 * })
 * 
 */
export function sendOk({ req, res, body, cookies, links, status = 200 }) {
    sendResponse({ req, res, body, cookies, links, status })
}
