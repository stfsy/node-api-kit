import { expect } from "chai";
import { newResourceId } from "../../lib/util/resource-id.js";
import service from '../_api/queues/service.js';
import apiServer from "../_api/server.js";
import apiTest from "./api-test.js";

describe('HttpGetResourceEndpoint', () => {
    let server

    before(() => {
        server = apiServer()
    })

    after(() => {
        service.clear()
    })

    after(() => {
        return new Promise((resolve) => server.close(resolve))
    })

    it('returns 400 if queue id is not a valid resource id', () => {
        return apiTest({ path: 'queues/123?' }, (res) => {
            const { body, status } = res
            expect(status).to.equal(400)

            const { status: errorStatus, title, details } = body
            expect(errorStatus).to.equal(400)
            expect(title).to.equal('Bad Request')

            const { queue_id: queueId } = body.details
            expect(queueId).to.equal('Must be a valid resource id.')
        })
    })

    it('returns 404 if resource does not exist', () => {
        return apiTest({ path: `queues/${newResourceId()}` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(404)

            const { status: errorStatus, title } = body
            expect(errorStatus).to.equal(404)
            expect(title).to.equal('Not Found')
        })
    })

    it('returns existing resources', () => {
        const id = newResourceId()
        const resource = { 1: 2 }
        service.create([id], resource)

        return apiTest({ path: `queues/${id}` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queue['1']).to.equal(2)
        })
    })

    it('returns the resource links', () => {
        const id = newResourceId()
        const resource = { 2: 3 }
        service.create([id], resource)

        return apiTest({ path: `queues/${id}` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            const { _links: links } = body
            expect(links.self.href).to.equal(`http://127.0.0.1:5001/queues/${id}`)
        })
    })
})