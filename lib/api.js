import express from 'express';
import cluster from 'node:cluster';
import { frontendHostname } from './configuration/service.js';
import booksRoute from './example/books/route.js';
import { forEndpoints } from './http/hateoas-links.js';
import { sendOk } from './http/send-http-ok.js';
import htmlEncoder from './middlewares/html-encoder.js';
import { accessLog, bodyParser, contentType, cors, defaultVersion, securityHeaders, traceContext, upstreamCacheControl } from './middlewares/index.js';
import { isMainFile } from './util/is-main-file.js';
import { logDebug } from './util/logger.js';

const app = express()
const hateoasRootEndpoints = ['books', 'authors']

app.set('x-powered-by', false)
app.set('etag', false)

app.use(traceContext()) // generate traceId and run other functions with trace context
app.use(contentType()) // check content type of delete, post, and put requests
app.use(accessLog()) // write status code, path and response time to log
app.use(defaultVersion()) // use /v1 as default and strip /v1 from incoming paths
app.use(upstreamCacheControl())
app.use(securityHeaders()) // add security headers
app.use(cors({ allowedOrigin: frontendHostname() })) // configure cors for additional security protection
app.use(bodyParser())
app.use(htmlEncoder({
    encodeResponsePayload: false
}))

// custom endpoints here
app.use('/books', booksRoute)

// reserving root for haetoas links
app.get('/', (req, res) => {
    const links = forEndpoints(req, hateoasRootEndpoints)
    sendOk({ req, res, links, body: {} })
})

// if this file is main file, or we are in a worker, then start the server 
// and wait for kill event to close
if (cluster.isWorker || isMainFile({ importMeta: import.meta })) {
    const server = app.listen(3000, () => {
        logDebug('Running api on 3000')
    })

    process.on('SIGINT', () => {
        server.close()
    })
}

export default app