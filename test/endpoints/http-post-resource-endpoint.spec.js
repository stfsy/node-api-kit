import { expect } from "chai";
import { newResourceId } from "../../lib/util/resource-id.js";
import service from '../_api/queues/service.js';
import apiServer from "../_api/server.js";
import apiTest from "./api-test.js";

describe('HttpPostResourceEndpoint', () => {
    let server

    before(async () => {
        server = await apiServer()
    })

    after(() => {
        service.clear()
    })

    after(() => {
        return server.close()
    })

    it('returns 400 if resource does not match schema', () => {
        const id = newResourceId()
        const resource = { 1: 2 }

        return apiTest({ path: `queues`, method: 'post', body: resource }, (res) => {
            const { body, status } = res
            expect(status).to.equal(400)

            expect(body.status).to.equal(400)
            expect(body.title).to.equal('Bad Request')
            expect(body.details.request).to.equal('Must not contain unknown keys.')
        })
    })

    it('returns 200 if the resource was stored', () => {
        const id = newResourceId()
        const resource = { data: { 1: 2 } }

        return apiTest({ path: `queues`, method: 'post', body: resource }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queue.id).not.to.be.undefined
            expect(body.queue.id).not.to.be.null
        })
    })

    it('returns the resource links', () => {
        const id = newResourceId()
        const resource = { data: { 2: 3 } }

        return apiTest({ path: `queues`, method: 'post', body: resource }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            const { _links: links } = body
            expect(links.self.href).to.equal(`http://127.0.0.1:5001/queues/${body.queue.id}`)
        })
    })
})