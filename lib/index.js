import bodyParser from 'body-parser';
import express from 'express';
import cluster from 'node:cluster';
import { frontendHostname } from './configuration/service.js';
import accessLog from './middlewares/access-log.js';
import contentType from './middlewares/content-type.js';
import cors from './middlewares/cors.js';
import defaultVersion from './middlewares/default-version.js';
import securityHeaders from './middlewares/security-headers.js';
import traceContext from './middlewares/trace-context.js';
import { isMainFile } from './util/is-main-file.js';
import { logDebug } from './util/logger.js';

const app = express()

app.set('x-powered-by', false)
app.set('etag', false)

app.use(traceContext()) // generate traceId and run other functions with trace context
app.use(contentType()) // check content type of delete, post, and put requests
app.use(accessLog()) // write status code, path and response time to log
app.use(defaultVersion()) // use /v1 as default and strip /v1 from incoming paths
app.use(securityHeaders()) // add security headers
app.use(cors({ allowedOrigin: frontendHostname() })) // configure cors for additional security protection
app.use(bodyParser.json())

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