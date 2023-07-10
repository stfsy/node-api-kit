import bodyParser from 'body-parser'
import express from 'express'
import { sendNotFound } from '../../lib/http/send-http-error.js'
import accessLog from '../../lib/middlewares/access-log.js'
import contentType from '../../lib/middlewares/content-type.js'
import defaultVersion from '../../lib/middlewares/default-version.js'
import securityHeaders from '../../lib/middlewares/security-headers.js'
import { deleteEndpoint as deleteMessage, getAllEndpoint as getAllMessages, getEndpoint as getMessage, postEndpoint as postMessage, putEndpoint as putMessage } from './messages/endpoints.js'
import { deleteEndpoint as deleteQueue, getAllEndpoint as getAllQueues, getEndpoint as getQueue, postEndpoint as postQueue, putEndpoint as putQueue } from './queues/endpoints.js'


export default () => {
    const app = express()

    app.use(accessLog())
    app.use(securityHeaders())
    app.use(contentType())
    app.use(defaultVersion())
    app.use(bodyParser.json())

    app.get('/queues', getAllQueues)
    app.post('/queues', postQueue)
    app.get('/queues/:queueId', getQueue)
    app.put('/queues/:queueId', putQueue)
    app.delete('/queues/:queueId', deleteQueue)

    app.get('/queues/:queueId/messages', getAllMessages)
    app.post('/queues/:queueId/messages', postMessage)
    app.get('/queues/:queueId/messages/:messageId', getMessage)
    app.put('/queues/:queueId/messages/:messageId', putMessage)
    app.delete('/queues/:queueId/messages/:messageId', deleteMessage)

    app.use((_, res) => {
        sendNotFound(res)
    })

    const server = app.listen(7001, () => {
        console.log('Test API server running on port', 7001)
    })

    return server
}