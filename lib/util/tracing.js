import api, { SpanStatusCode } from '@opentelemetry/api'
import { SemanticAttributes } from '@opentelemetry/semantic-conventions'

/**
 * @typedef {import('@opentelemetry/api').Tracer} Tracer
 */

/**
 * @typedef {String|Tracer} StringOrTracer
 */

/**
 * @callback ActiveSpanCallback
 * @param {import('@opentelemetry/api').Span} span
 */

/**
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 */
export async function withActiveSpan(tracerNameOrTracer, spanName, spanAttributes, callback) {
    const tracer = getTracer(tracerNameOrTracer)

    return tracer.startActiveSpan(spanName, async (span) => {
        setSpanAttributes(span, spanAttributes)

        try {
            let result = callback(span)
            if (result?.finally) {
                result = await result
            }
            return result
        } catch (e) {
            handleException(span, e)
            throw e
        } finally {
            span.end()
        }
    })
}

/**
 * 
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @returns {Tracer}
 */
function getTracer(tracerNameOrTracer) {
    let tracer = tracerNameOrTracer
    if (typeof tracerName === 'string') {
        tracer = api.trace.getTracer(tracerNameOrTracer)
    }
    return tracer
}

function handleException(span, e) {
    span.recordException(e)
    span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
    })
}

function setSpanAttributes(span, spanAttributes) {
    Object.entries(spanAttributes).forEach(([key, value]) => {
        if (value) {
            span.setAttribute(key, value)
        }
    })
}

/**
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 */
export function withActiveSpanSync(tracerNameOrTracer, spanName, spanAttributes, callback) {
    const tracer = getTracer(tracerNameOrTracer)

    const span = tracer.startSpan(spanName)
    setSpanAttributes(span, spanAttributes)

    api.context.with(span, callback)

    try {
        const result = callback(span)
        return result
    } catch (e) {
        handleException(span, e)
        throw e
    } finally {
        span.end()
    }
}

/**
 * 
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 */
export async function withOrpanedSpan(tracerNameOrTracer, spanName, spanAttributes, callback) {
    const tracer = getTracer(tracerNameOrTracer)
    const span = tracer.startSpan(spanName)

    setSpanAttributes(span, spanAttributes)

    try {
        let result = callback(span)
        if (result?.finally) {
            result = await result
        }
        return result
    } catch (e) {
        handleException(e)
        throw e
    } finally {
        span.end()
    }
}

/**
 * @callback WithActiveSpanFn
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional attributes for the span
 * @param {ActiveSpanCallback} callback the function to call
 */

/**
 * @typedef TracerFacade
 * @property {WithActiveSpanFn} withActiveSpan
 * @property {WithActiveSpanFn} withActiveSpanSync
 * @property {WithActiveSpanFn} withOrpanedSpan
 */

/**
 * @typdef CreateTracerOptions
 * @property {String} [version] the version of the tracer
 * @property {String} [filepath] the filename of the traced functions. For es6 modules use import.meta.url, for CommonJS use `${__dirname}/${__filename}`
 */

/**
 * 
 * @param {String} name name of the tracer
 * @param {CreateTracerOptions} [options] 
 * @returns {TracerFacade}
 */
export function createTracer(name, { version, filepath } = {}) {
    const tracer = api.trace.getTracer(name, version)

    return {
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} spanAttributes additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withActiveSpan: (spanName, spanAttributes, callback) => {
            if (typeof spanAttributes === 'function') {
                callback = spanAttributes
                spanAttributes = {}
            }
            const attributes = Object.assign({}, spanAttributes, {
                [SemanticAttributes.CODE_FILEPATH]: filepath
            })
            return withActiveSpan(tracer, spanName, attributes, callback)
        },
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} spanAttributes additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withActiveSpanSync: (spanName, spanAttributes, callback) => {
            if (typeof spanAttributes === 'function') {
                callback = spanAttributes
                spanAttributes = {}
            }
            const attributes = Object.assign({}, spanAttributes, {
                [SemanticAttributes.CODE_FILEPATH]: filepath
            })
            return withActiveSpanSync(tracer, spanName, attributes, callback)
        },
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} spanAttributes additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withOrpanedSpan: (spanName, spanAttributes, callback) => {
            if (typeof spanAttributes === 'function') {
                callback = spanAttributes
                spanAttributes = {}
            }
            const attributes = Object.assign({}, spanAttributes, {
                [SemanticAttributes.CODE_FILEPATH]: filepath
            })
            return withOrpanedSpan(tracer, spanName, attributes, callback)
        }
    }
}   