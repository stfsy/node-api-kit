# Caveats
## Routers and Route Params
This library relies on [ExpressJS Route Params](https://expressjs.com/en/guide/routing.html#route-parameters) feature. By default route params of parent routes are not passed down to child routes. To enable route params being passed to child routes `mergeParams: true` to the router constructor as shown below.

```js
import { sendNotFound } from '@stfsy/api-kit/http'
import { Router } from 'express'
import createApiClient from './create-api-client-endpoint.js'

// make sure mergeParams: true is passed to each router instance
// passing in caseSensitive: true is optional
const router = Router({ caseSensitive: true, mergeParams: true })

router.post('/', createApiClient)

// also catch unknown routes here, too, as a best practice :)
router.use((_, res) => {
    sendNotFound(res)
})

export default router
```