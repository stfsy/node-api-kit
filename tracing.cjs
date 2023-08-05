const { Resource } = require("@opentelemetry/resources")
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions")
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base")
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node")
const { trace } = require("@opentelemetry/api")
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http")
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express")
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb")
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http")
const { registerInstrumentations } = require("@opentelemetry/instrumentation")
const { GrpcInstrumentation } = require("@opentelemetry/instrumentation-grpc")
const { DnsInstrumentation } = require("@opentelemetry/instrumentation-dns")
const { default: FsInstrumentation } = require("@opentelemetry/instrumentation-fs")
const { NetInstrumentation } = require("@opentelemetry/instrumentation-net")
const { PinoInstrumentation } = require("@opentelemetry/instrumentation-pino")

const serviceName = process.env.API_SERVICE_NAME ?? 'api-kit'

const exporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces"
})

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }),
})

provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
provider.register()
registerInstrumentations({
  instrumentations: [
    // list can be found here https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/metapackages/auto-instrumentations-node/src/utils.ts
    new DnsInstrumentation(),
    new ExpressInstrumentation(),
    new FsInstrumentation(),
    new GrpcInstrumentation(), // e.g. google cloud firestore
    new HttpInstrumentation(),
    new MongoDBInstrumentation(),
    new NetInstrumentation(),
    new PinoInstrumentation()
  ],
  tracerProvider: provider,
})

module.exports = trace.getTracer(serviceName)