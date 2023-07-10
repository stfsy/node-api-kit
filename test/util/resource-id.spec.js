import { expect } from "chai";
import { newResourceId } from "../../lib/util/resource-id.js";

describe('ResourceId', () => {

    describe('.newResourceId', () => {
        it('returns a new resourceId each time', () => {
            expect(newResourceId()).not.to.equal(newResourceId())
        })
    })
})