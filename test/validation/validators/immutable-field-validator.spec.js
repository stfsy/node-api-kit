import { expect } from "chai";
import validator from '../../../lib/validation/validator.js';
import { useImmutableFieldValidator } from "../../../lib/validation/validators/immutable-field-validator.js";

describe('ImmutableFieldValidator', () => {

    it('does not require a schema', async () => {
        const schema = useImmutableFieldValidator()
        expect(schema.__validator).to.equal('api-kit/ImmutableFieldValidator')
    })

    it('sets the private validator name property', async () => {
        const schema = useImmutableFieldValidator({})
        expect(schema.__validator).to.equal('api-kit/ImmutableFieldValidator')
    })

    it('provides a schema with type custom', () => {
        const schema = useImmutableFieldValidator({})
        expect(schema.type).to.equal('custom')
    })

    it('validates if immutable field is not set', async () => {
        const resourceIdValidator = validator.compile({ name: useImmutableFieldValidator({ optional: true }) })
        const result = await resourceIdValidator({ first_name: 'test' })
        expect(result).to.be.true
    })

    it('does not validate if immutable field is set', async () => {
        const resourceIdValidator = validator.compile({ name: useImmutableFieldValidator({}) })
        const result = await resourceIdValidator({ name: 'test' })
        expect(result.at(0).type).to.equal('fieldImmutable')
    })
})