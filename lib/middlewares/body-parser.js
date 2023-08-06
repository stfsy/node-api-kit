import bodyParser from 'body-parser';
import { logInfo } from "../util/logger.js";
import { createTracer } from '../util/tracing.js';

const { withActiveSpan } = createTracer('body-parser-middleware', {
    filepath: import.meta.url
})

/**
 * @name BodyParserOptions
 * @typedef BodyParserOptions
 * @property {boolean} [inflate=true] When set to true, then deflated (compressed) bodies will be inflated; when false, deflated bodies are rejected. Defaults to true.
 * @property {number|string} [limit=100kb]  Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'
 * @property {function} [verify] The verify option, if supplied, is called as verify(req, res, buf, encoding) where buf is a Buffer of the raw request body and encoding is the encoding of the request.
 * @property {function} [reviver] The reviver option is passed directly to JSON.parse as the second argument.
 * @property {boolean} [strict=true] When set to `true`, will only accept arrays and objects; when `false` will accept anything JSON.parse accepts. Defaults to `true`.
 */

/**
 * Parses the incoming request body and attaches the parsed body to the `request` object.
 * 
 * @example 
 * // With default settings
 * import bodyParserMiddleware from './lib/middlewares/body-parser.js'
 * 
 * app.use(bodyParserMiddleware())
 * 
 * @module BodyParserMiddleware
 * @param {BodyParserOptions} [bodyParserOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function (bodyParserOptions = {}) {
    logInfo('Body parser middleware registered')
    const bodyParserMiddleware = bodyParser.json(bodyParserOptions)

    return async (req, res, next) => {
        await withActiveSpan('parse-request-body', async () => {
            await new Promise((resolve) => {
                bodyParserMiddleware(req, res, resolve)
            })
        })

        return next()
    }
}