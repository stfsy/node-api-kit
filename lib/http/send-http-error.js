import { STATUS_CODES } from 'node:http'
import * as _types from '../types.js'

/**
 * @private
 * @param {_types.Response} res the http response
 * @param {Number} status 
 * @param {_types.String} title 
 * @param {Object} details 
 */
function send(res, status, title, details) {
    const payload = { status, title }
    if (details) {
        payload.details = details
    }

    res.status(status)
        .contentType('application/json')
        .send(JSON.stringify(payload))
}

/**
 * @private
 * @param {_types.Response} res the http response
 * @param {String} status 
 * @param {Object} details 
 */
function sendError(res, status, details) {
    send(res, parseInt(status), STATUS_CODES[status], details)
}

/**
 * Sends response 400 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response
 */
export function sendBadRequest(res, details) {
    sendError(res, '400', details)
}

/**
 * Sends response 401 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendUnauthorized(res, details) {
    sendError(res, '401', details)
}

/**
 * Sends response 402 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendPaymentRequired(res, details) {
    sendError(res, '402', details)
}

/**
 * Sends response 404 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendNotFound(res, details) {
    sendError(res, '404', details)
}

/**
 * Sends response 405 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendMethodNotAllowed(res, details) {
    sendError(res, '405', details)
}

/**
 * Sends response 409 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendConflict(res, details) {
    sendError(res, '409', details)
}

/**
 * Sends response 415 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title. 
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendUnsupportedMedia(res, details) {
    sendError(res, '415', details)
}

/**
 * Sends response 422 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendUnprocessableEntiy(res, details) {
    sendError(res, '422', details)
}

/**
 * Sends response 429 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendTooManyRequests(res, details) {
    sendError(res, '429', details)
}

/**
 * Sends response 500 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title. 
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendInternalError(res, details) {
    sendError(res, '500', details)
}

/**
 * Sends response 501 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {Object} details additional details to be added to the response 
 */
export function sendNotImplemented(res, details) {
    sendError(res, '501', details)
}