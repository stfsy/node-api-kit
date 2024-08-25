import cors from 'cors'
import * as _types from '../types.js'
import { logInfo } from '../util/index.js'

const HTTP_DELETE_GET_POST_PUT = ['GET', 'PUT', 'POST', 'DELETE']
const CONTENT_TYPE_AND_AUTHORIZATION = ['content-type', 'authorization']

/**
 * @typedef CorsMiddlewareOptions
 * @name CorsMiddlewareOptions
 * @property {string | RegExp | string[] | RegExp[]} allowedOrigin string(s), or regular expression(s) describing origins allowed to access the current resource
 * @property {Array.<string>} [allowedMethods=[GET,PUT,POST,DELETE]] array of allowed http methods
 * @property {Array.<string>} [allowedHeaders=[content-type, authorization]] array of allowed http headers
 * @property {boolean} [allowCredentials=true] true, if browser should send credentials e.g. cookies to the server
 * @property {number} [allowedMaxAge=1800] max number of seconds the browser should cache the cors response
 * @property {boolean} [preflightContinue=false] false, if the middleware should treat the request as handled an respond immediately
 * @property {number} [optionsSuccessStatus=204] status code for the options request for backwards compatibility with older browsers
 */

/**
 * The default version middleware modifies the incoming path to allow for a versioned API strategy.
 * For each request, the middleware checks, if
 * - the incoming path contains the given default version
 * - if yes, the version is stripped from the incoming request object so that other middlewares see only the modified  e.g. /v1/users/create -> /users/create
 * - if not, the middleware will not modify the incoming request
 * 
 * @module CorsMiddleware
 * @param {CorsMiddlewareOptions} [CorsMiddlewareOptions=null]
 * @returns {_types.MiddlewareFunction}
 * @example 
 * // With default settings and custom origin
 * import corsMiddleware from './lib/middlewares/cors.js'
 * 
 * app.use(corsMiddleware({
 *   origin: ['https://www.example.com', 'https://dashboard.example.com]
 * }))
 * 
 */
export default function ({
    allowedOrigin,
    allowedMethods = HTTP_DELETE_GET_POST_PUT,
    allowedHeaders = CONTENT_TYPE_AND_AUTHORIZATION,
    allowedMaxAge = 1800,
    allowCredentials = true,
    preflightContinue = false,
    optionsSuccessStatus = 204
} = {}) {
    if (!allowedOrigin) {
        throw new Error(`Cors Middleware requires origin to be set. Received ${allowedOrigin}`)
    }

    logInfo('Cors middleware registered')

    return cors(
        {
            origin: allowedOrigin,
            methods: allowedMethods,
            allowedHeaders,
            credentials: allowCredentials,
            maxAge: allowedMaxAge,
            preflightContinue,
            optionsSuccessStatus
        })
}