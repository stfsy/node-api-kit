import { createTracer } from '@discue/open-telemetry-tracing';
import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes';
import { sendUnsupportedMedia } from '../http/send-http-error.js';
import * as _types from '../types.js';
import { logInfo } from '../util/index.js';
import { getPackageName } from '../util/package.js';

const { withOrphanedSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * @private
 */
const HTTP_DELETE_POST_PUT = ['DELETE', 'POST', 'PUT']

/**
 * @private
 */
const APPLICATION_JSON = 'application/json'

/**
 * @name ContentTypeMiddlewareOptions
 * @typedef ContentTypeMiddlewareOptions
 * @property {String} [contentType=application/json]
 * @property {String} [httpMethods=[DELETE,POST,PUT]]
 */

/**
 * The content type middleware requires a defined content type for a set of http methods.
 * Per default, the middleware checks
 * - if the request has http method `DELETE`, `POST`, `PUT`,
 * - if yes, if the content-type header is set
 * - if yes, if the content-type header has value `application/json`
 * - if yes, the next middleware function is called
 * - if not, an error is returned to the client
 * 
 * - if the request has any other http method .e.g `GET`
 * - the next middleware function is called
 * 
 * For other http methods e.g. `GET`, the middleware will not do any checks.
 * 
 * @example 
 * // With default settings
 * import contentTypeMiddleware from './lib/middlewares/content-type.js'
 * 
 * app.use(contentTypeMiddleware())
 
 * @example 
 * // With custom content-type
 * import contentTypeMiddleware from './lib/middlewares/content-type.js'
 * 
 * app.use(contentTypeMiddleware({
 *   requiredContentType: 'application/xml'
 * }))
 * 
 * @module ContentTypeMiddleware
 * @param {ContentTypeMiddlewareOptions} [contentTypeMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function ({ httpMethods = HTTP_DELETE_POST_PUT, contentType = APPLICATION_JSON } = {}) {
    logInfo('Content type middleware registered')

    return function (request, response, nextFunction) {
        const { method, headers } = request
        const incomingContentType = headers['content-type'] ?? ''
        const spanAttributes = { method, incomingContentType }

        return withOrphanedSpan('validate-content-type', spanAttributes, (span) => {

            if (httpMethods.includes(method)) {
                if (!incomingContentType || !incomingContentType.includes(contentType)) {
                    span.addEvent('Validation failed').setStatus({ code: SpanStatusCode.ERROR })
                    return sendUnsupportedMedia(response)

                } else {
                    span.addEvent('Validation succeeded').setStatus({ code: SpanStatusCode.OK })
                }

            } else {
                span.addEvent('No validation necessary').setStatus({ code: SpanStatusCode.OK })
            }

            return nextFunction()
        })
    }
}