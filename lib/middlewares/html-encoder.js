import { encode as encodeHtml } from 'html-entities'
import * as _types from '../types.js'
import { logInfo } from '../util/logger.js'

/**
 * @private
 * @param {Object} value 
 * @returns 
 */
const encoder = (value) => {
    if (typeof value === 'object') {
        return encode(value)
    } else if (value === false) {
        return false
    } else {
        return encodeHtml(value)
    }
}

/**
 * @private
 * @param {Object} value 
 * @returns 
 */
const encode = (object) => {
    const result = {}
    if (typeof object === 'string') {
        return encodeHtml(object)
    }
    if (Array.isArray(object)) {
        return object.map(encoder)
    }
    Object.entries(object).forEach(([key, value]) => {
        if (typeof value === 'object') {
            result[key] = encode(value)
        } else if (value === false) {
            result[key] = false
        } else {
            result[key] = encodeHtml(value)
        }
    })

    return result
}


/**
 * @name HtmlEncoderMiddlewareOptions
 * @typedef HtmlEncoderMiddlewareOptions
 * @property {boolean} [encodeRequestPayload=true]
 * @property {boolean} [encodeResponsePayload=true]
 */

/**
 * Encodes incoming request and outoing response payload to prevent XSS attacks.
 * 
 * Note: Only outgoing JSON responses will be encoded.
 * 
 * @example 
 * // With default settings
 * import htmlEncoderMiddleware from './lib/middlewares/html-encoder.js'
 * 
 * app.use(htmlEncoderMiddleware())
 
 * @example 
 * // With only response encoder middleware enabled.
 * import htmlEncoderMiddleware from './lib/middlewares/html-encoder.js'
 * 
 * app.use(htmlEncoderMiddleware({
 *   encodeRequestPayload: false,
 *   encodeResponsePayload: true
 * }))
 * 
 * @module HtmlEncoderMiddleware
 * @param {HtmlEncoderMiddlewareOptions} [htmlEncoderMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function ({ encodeRequestPayload = true, encodeResponsePayload = true } = {}) {
    if (encodeRequestPayload && !encodeResponsePayload) {
        logInfo('HTML request encoder middleware registered')
        return requestEncoder()
    }

    if (!encodeRequestPayload && encodeResponsePayload) {
        logInfo('HTML response encoder middleware registered')
        return responseEncoder()
    }

    if (!encodeRequestPayload && !encodeResponsePayload) {
        return (_req, _res, next) => next()
    }

    logInfo('HTML request&response encoder middleware registered')

    const requestEncoderFn = requestEncoder()
    const responseEncoderFn = responseEncoder()

    return (req, res, next) => {
        requestEncoderFn(req, res, () => {
            responseEncoderFn(req, res, next)
        })
    }
}

/**
 * @private
 */
const REQUEST_PROPERTIES_TO_ENCODE = ['body', 'headers', 'params', 'query']

/**
* @module HtmlEncoderMiddleware
* @return {_types.MiddlewareFunction}
*/
export const requestEncoder = function () {
    return (req, _res, next) => {
        REQUEST_PROPERTIES_TO_ENCODE.forEach(property => {
            if (req[property]) {
                req[property] = encode(req[property])
            }
        })
        next()
    }
}

/**
* @module HtmlEncoderMiddleware
* @return {_types.MiddlewareFunction}
*/
export const responseEncoder = function () {
    return (_req, res, next) => {
        res._apiKit = {
            response: {
                encode: true
            }
        }

        next()
    }
}