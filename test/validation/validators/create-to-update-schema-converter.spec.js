import { expect } from "chai";
import { converter } from "../../../lib/validation/create-to-update-schema-converter.js";

describe('CreateToUpdateSchemaConverter', () => {

    it('injects the immutability operator for fields marked as immutable', () => {
        const parsedSchema = converter({
            test: { type: 'string', immutable: true }
        })
        expect(parsedSchema.test.check).to.be.a('function')
    })

    it('removes the default value', () => {
        const parsedSchema = converter({
            test: { type: 'string', default: 'test' }
        })
        expect(parsedSchema.test.default).to.be.undefined
    })
    
    it('marks objects as optional', () => {
        const parsedSchema = converter({
            test: { type: 'string', default: 'test' }
        })
        expect(parsedSchema.test.optional).to.be.true
    })
})