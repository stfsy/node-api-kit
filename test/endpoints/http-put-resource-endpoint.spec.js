import { expect } from "chai";
import { newResourceId } from "../../lib/util/resource-id.js";
import service from '../_api/queues/service.js';
import apiServer from "../_api/server.js";
import apiTest from "./api-test.js";

describe('HttPutResourceEndpoint', () => {
    let server

    before(() => {
        server = apiServer()
    })

    afterEach(() => {
        service.clear()
    })

    after(() => {
        return new Promise((resolve) => server.close(resolve))
    })

    it('returns 404 if resource was not found', () => {
        const id = newResourceId()
        const resource = { alias: 'hello' }

        return apiTest({ path: `queues/${id}`, method: 'put', body: resource }, (res) => {
            const { body, status } = res
            expect(status).to.equal(404)

            expect(body.status).to.equal(404)
            expect(body.title).to.equal('Not Found')
        })
    })

    it('returns 400 if resource does not match schema', () => {
        const id = newResourceId()
        const resource = { id, 1: 2 }
        service.create([id], resource)

        const update = { name: 'hello' }

        return apiTest({ path: `queues/${id}`, method: 'put', body: resource }, (res) => {
            const { body, status } = res
            expect(status).to.equal(400)

            expect(body.status).to.equal(400)
            expect(body.title).to.equal('Bad Request')
            expect(body.details.request).to.equal('Must not contain unknown keys.')
        })
    })

    it('returns 200 if resource was updated', () => {
        const id = newResourceId()
        const resource = { id, 1: 2 }
        service.create([id], resource)

        const update = { alias: 'hello' }

        return apiTest({ path: `queues/${id}`, method: 'put', body: update }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queue.id).to.equal(id)
        })
    })

    it('returns the resource links', () => {
        const id = newResourceId()
        const resource = { id, 1: 2 }
        service.create([id], resource)

        const update = { alias: 'hello' }

        return apiTest({ path: `queues/${id}`, method: 'put', body: update }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            const storedQueue = service.getAll().at(0)

            const { _links: links } = body
            expect(links.self.href).to.equal(`http://127.0.0.1:5001/queues/${storedQueue.id}`)
        })
    })
})