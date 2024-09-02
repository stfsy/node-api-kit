import { expect } from "chai";
import { newResourceId } from "../../lib/util/resource-id.js";
import service from '../_api/queues/service.js';
import apiServer from "../_api/server.js";
import apiTest from "./api-test.js";

describe('HttpGetAllResourceEndpoint', () => {
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

    it('returns 404 if resource does not exist', () => {
        return apiTest({ path: `queues` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queues).to.have.length(0)
        })
    })

    it('returns existing resources', () => {
        const resource = { 1: 2 }
        const ids = [
            newResourceId(),
            newResourceId()
        ]

        ids.forEach((id) => {
            service.create([id], { id, alias: id, ...resource })
        })

        return apiTest({ path: `queues` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queues).to.have.length(2)
        })
    })

    it('returns the resource links', () => {
        const id = newResourceId()
        const resource = { 2: 3 }
        service.create([id], { id, ...resource })

        return apiTest({ path: `queues` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            const { _links: links } = body
            expect(links.self.href).to.equal(`http://127.0.0.1:5001/queues`)
            expect(links[id].href).to.equal(`http://127.0.0.1:5001/queues/${id}`)
        })
    })
})