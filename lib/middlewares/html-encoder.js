import { encode as encodeHtml } from 'html-entities'
import * as _types from '../types.js'
import { logInfo } from '../util/logger.js'

/**
 * @param {object} value 
 * @returns {object}
 * @private
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
 * @param {object} value 
 * @returns {object}
 * @private
 */
const encode = (value) => {
    const result = {}
    if (typeof value === 'string') {
        return encodeHtml(value)
    }
    if (Array.isArray(value)) {
        return value.map(encoder)
    }
    Object.entries(value).forEach(([key, value]) => {
        if (value == null) {
            return
        } else if (typeof value === 'object') {
            result[key] = encode(value)
        } else if (value === false) {
            result[key] = false
        } else {
            if (typeof value === 'string') {
                result[key] = encodeHtml(value)
            } else {
                result[key] = value
            }
        }
    })

    return result
}


/**
 * @typedef HtmlEncoderMiddlewareOptions
 * @name HtmlEncoderMiddlewareOptions
 * @property {boolean} [encodeRequestPayload=true]
 * @property {boolean} [encodeResponsePayload=true]
 */

/**
 * Encodes incoming request and outoing response payload to prevent XSS attacks.
 * 
 * Note: Only outgoing JSON responses will be encoded.
 * 
 * @module HtmlEncoderMiddleware
 * @param {HtmlEncoderMiddlewareOptions} [htmlEncoderMiddlewareOptions=null]
 * @returns {_types.MiddlewareFunction}
 * @example 
 * // With default settings
 * import htmlEncoderMiddleware from './lib/middlewares/html-encoder.js'
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
 * @returns {_types.MiddlewareFunction}
 */
export const requestEncoder = function () {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Request} _res 
     * @param {import('express').NextFunction} next 
     */
    const encoder = (req, _res, next) => {
        REQUEST_PROPERTIES_TO_ENCODE.forEach(property => {
            if (req[property]) {
                // use reflect, not all properties have setters anymore
                Reflect.set(req, property, encode(req[property]))
            }
        })
        next()
    }
    return encoder
}

/**
 * @module HtmlEncoderMiddleware
 * @returns {_types.MiddlewareFunction}
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