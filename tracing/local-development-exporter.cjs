const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http")

module.exports = () => {
  return new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces"
  })
}