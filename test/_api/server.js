import express from 'express';
import { sendNotFound } from '../../lib/http/send-http-error.js';
import { accessLog, bodyParser, contentType, defaultVersion, htmlEncoder, securityHeaders, upstreamCacheControl } from '../../lib/middlewares/index.js';
import queueEndpoints from './queues/endpoints.js';

export default () => {
    const app = express()

    app.use(accessLog())
    app.use(securityHeaders())
    app.use(contentType())
    app.use(defaultVersion())
    app.use(bodyParser())
    app.use(upstreamCacheControl())
    app.use(htmlEncoder({
        encodeResponsePayload: false
    }))

    app.get('/queues', queueEndpoints.getAll)
    app.post('/queues', queueEndpoints.post)
    app.get('/queues/:queueId', queueEndpoints.get)
    app.put('/queues/:queueId', queueEndpoints.put)
    app.delete('/queues/:queueId', queueEndpoints.delete)

    app.use((_, res) => {
        sendNotFound(res)
    })

    const server = app.listen(7001, () => {
        console.log('Test API server running on port', 7001)
    })

    return server
}