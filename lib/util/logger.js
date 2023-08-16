import api from '@opentelemetry/api';
import pino from 'pino';
import { isDevelopment } from '../configuration/service.js';

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
    const currentSpan = api.trace.getSpan(api.context.active());
    if (currentSpan) {
        const { traceId, spanId } = currentSpan.spanContext();
        context.traceId = traceId
        context.spanId = spanId
    }
    logger[level](context, message);
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