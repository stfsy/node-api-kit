if (process.env.AWS_REGION) {
    //
} else {
    module.exports = require('./gcp/gcp-tracer-provider.cjs')
}