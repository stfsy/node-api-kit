const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base")
const { trace } = require("@opentelemetry/api")
const { registerInstrumentations } = require("@opentelemetry/instrumentation")
const createInstrumentations = require('./instrumentations.cjs')
const createTracerProvider = require('./tracer-provider.cjs')
const createTraceExporter = require('./exporter.cjs')

const serviceName = process.env.API_SERVICE_NAME ?? 'api-kit'

const exporter = createTraceExporter()
const tracerProvider = createTracerProvider(serviceName)

tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter))
tracerProvider.register()
registerInstrumentations({
  instrumentations: createInstrumentations(),
  tracerProvider,
})

module.exports = trace.getTracer(serviceName)