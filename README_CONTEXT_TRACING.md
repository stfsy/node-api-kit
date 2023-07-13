# Usage
The `trace-context` middleware can be used to enhance generate a unique `traceId` for each requests.
For every incoming request, the middleware will make the `traceId`, and also the `request` and `response` objects available for other application components.

Once the `trace-context` middleware has been registered in the application, the `trace-context` util can be used to get the context information.

```js
import express from 'express';
import traceContext from './middlewares/trace-context.js';

const app = express()

app.use(traceContext()) // generate traceId and run other functions with trace context
```

To get the context information, use the respective functions from the `trace-context` util.

```js
import { getFromLocalStorage, getRequestFromLocalStorage, getResponseFromLocalStorage, getTraceIdFromLocalStorage } from "../../lib/util/trace-context.js"

const traceId = getTraceIdFromLocalStorage()
const request = getRequestFromLocalStorage()
const response = getResponseFromLocalStorage()
```