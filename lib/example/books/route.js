import { Router } from 'hyper-express'
import { sendNotFound } from '../../http/send-http-error.js'
import queueEndpoints from './endpoints.js'

const route = Router()

route.get('/', queueEndpoints.getAll)
route.post('/', queueEndpoints.post)

route.get('/:bookId', queueEndpoints.get)
route.put('/:bookId', queueEndpoints.put)
route.delete('/:bookId', queueEndpoints.delete)

route.use((_, res) => {
    sendNotFound(res)
})

export default route
