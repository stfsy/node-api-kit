import { createTracer } from '@discue/open-telemetry-tracing'
import bodyParser from 'body-parser'
import * as _types from '../types.js'
import { logInfo } from '../util/index.js'
import { getPackageName } from '../util/package.js'

const { withActiveSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * @typedef BodyParserOptions
 * @name BodyParserOptions
 * @property {boolean} [inflate=true] When set to true, then deflated (compressed) bodies will be inflated; when false, deflated bodies are rejected. Defaults to true.
 * @property {number|string} [limit=100kb]  Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'
 * @property {Function} [verify] The verify option, if supplied, is called as verify(req, res, buf, encoding) where buf is a Buffer of the raw request body and encoding is the encoding of the request.
 * @property {Function} [reviver] The reviver option is passed directly to JSON.parse as the second argument.
 * @property {boolean} [strict=true] When set to `true`, will only accept arrays and objects; when `false` will accept anything JSON.parse accepts. Defaults to `true`.
 */

/**
 * Parses the incoming request body and attaches the parsed body to the `request` object.
 * 
 * @module BodyParserMiddleware
 * @param {BodyParserOptions} [bodyParserOptions=null]
 * @returns {_types.MiddlewareFunction}
 * @example 
 * // With default settings
 * import bodyParserMiddleware from './lib/middlewares/body-parser.js'
 * 
 * app.use(bodyParserMiddleware())
 * 
 */
export default function (bodyParserOptions = {}) {
    logInfo('Body parser middleware registered')
    const bodyParserMiddleware = bodyParser.json(bodyParserOptions)

    return async (req, res) => {
        return withActiveSpan('parse-request-body', async () => {
            req.body = await req.json()
        })
    }
}