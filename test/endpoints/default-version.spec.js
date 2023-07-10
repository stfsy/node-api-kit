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

    it('returns existing resources', () => {
        const id = newResourceId()
        const resource = { 1: 2 }
        service.create([id], resource)

        return apiTest({ path: `v1/queues/${id}` }, (res) => {
            const { body, status } = res
            expect(status).to.equal(200)

            expect(body.queue['1']).to.equal(2)
        })
    })

})