import { STATUS_CODES } from 'node:http'
import * as _types from '../types.js'
import { sendResponse } from './send-http-response.js'

/**
 * @param {_types.Response} res the http response
 * @param {number} status 
 * @param {_types.String} title 
 * @param {object} details 
 * @private
 */
function send(res, status, title, details) {
    const body = { status, title }
    if (details) {
        body.details = details
    }

    sendResponse({ res, status, body })
}

/**
 * @param {_types.Response} res the http response
 * @param {string} status 
 * @param {object} details 
 */
export function sendHttpError(res, status, details) {
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
 * @param {object} details additional details to be added to the response
 */
export function sendBadRequest(res, details) {
    sendHttpError(res, '400', details)
}

/**
 * Sends response 401 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendUnauthorized(res, details) {
    sendHttpError(res, '401', details)
}

/**
 * Sends response 402 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendPaymentRequired(res, details) {
    sendHttpError(res, '402', details)
}

/**
 * Sends response 404 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendNotFound(res, details) {
    sendHttpError(res, '404', details)
}

/**
 * Sends response 405 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendMethodNotAllowed(res, details) {
    sendHttpError(res, '405', details)
}

/**
 * Sends response 409 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendConflict(res, details) {
    sendHttpError(res, '409', details)
}

/**
 * Sends response 415 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title. 
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendUnsupportedMedia(res, details) {
    sendHttpError(res, '415', details)
}

/**
 * Sends response 422 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendUnprocessableEntiy(res, details) {
    sendHttpError(res, '422', details)
}

/**
 * Sends response 429 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendTooManyRequests(res, details) {
    sendHttpError(res, '429', details)
}

/**
 * Sends response 500 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title. 
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendInternalError(res, details) {
    sendHttpError(res, '500', details)
}

/**
 * Sends response 501 to the client. Additional details can be attached
 * to the response body.
 * 
 * By default, the response body contains the http status number
 * and http status title.
 * 
 * @param {_types.Response} res the http response
 * @param {object} details additional details to be added to the response 
 */
export function sendNotImplemented(res, details) {
    sendHttpError(res, '501', details)
}