import tracing from '@discue/open-telemetry-tracing'
import pino from 'pino'
import { isDevelopment } from '../configuration/service.js'
const { getActiveSpanAndTraceIds } = tracing

const pinoOptions = {}
if (isDevelopment()) {
    pinoOptions.transport = {
        target: 'pino-pretty'
    }
    pinoOptions.level = 'debug'
}

const logger = pino(pinoOptions)

function log(level, message) {
    const context = {}
    const { traceId, spanId } = getActiveSpanAndTraceIds()
    context.traceId = traceId
    context.spanId = spanId
    logger[level](context, message)
}

export const logDebug = (message) => {
    log('debug', message)
}

export const logInfo = (message) => {
    log('info', message)
}

export const logWarn = (message) => {
    log('warn', message)
}

export const logError = (message) => {
    log('error', message)
}