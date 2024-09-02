import express from 'hyper-express';
import { accessLog, bodyParser, contentType, normalizeRequest, securityHeaders } from '../../lib/middlewares/index.js';
import queueEndpoints from './queues/endpoints.js';

export default () => {
    const app = new express.Server({ auto_close: true })

    app.use(accessLog())
    app.use(securityHeaders())
    app.use(contentType())
    app.use(normalizeRequest())
    app.use(bodyParser())
    // app.use(upstreamCacheControl())
    // app.use(htmlEncoder({
    //     encodeResponsePayload: false
    // }))

    app.get('/queues', queueEndpoints.getAll)
    app.post('/queues', queueEndpoints.post)
    app.get('/queues/:queueId', queueEndpoints.get)
    app.get('/v1/queues/:queueId', queueEndpoints.get)
    app.put('/queues/:queueId', queueEndpoints.put)
    app.delete('/queues/:queueId', queueEndpoints.delete)

    // app.use((_, res) => {
    //     sendNotFound(res)
    // })

    app.listen(7001, () => {
        console.log('Test API server running on port', 7001)
    })

    return app
}