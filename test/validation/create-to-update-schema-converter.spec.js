import { expect } from "chai";
import { converter } from "../../lib/validation/create-to-update-schema-converter.js";
import { useNotAllowedDuringCreationValidator } from "../../lib/validation/validators/not-allowed-for-creation-field-validator.js";

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

    it('marks a string as optional', () => {
        const parsedSchema = converter({
            test: { type: 'string', empty: false }
        })
        expect(parsedSchema.test.optional).to.be.true
    })

    it('replaces not allowed during creation validator with immutable field validator', () => {
        const parsedSchema = converter({
            test: useNotAllowedDuringCreationValidator({})
        })
        expect(parsedSchema.test.optional).to.be.true
        expect(parsedSchema.test.__validator).to.equal('api-kit/ImmutableFieldValidator')
    })
})