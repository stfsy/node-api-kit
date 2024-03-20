import { expect } from "chai";
import { customAlphabet } from "nanoid";
import { resourceIdAlphabet } from "../../../lib/util/resource-id.js";
import validator from '../../../lib/validation/validator.js';
import { useResourceIdValidator } from "../../../lib/validation/validators/resource-id-validator.js";

const nanoid = customAlphabet(resourceIdAlphabet)

describe('ResourceIdValidator', () => {

    it('sets the private validator name property', async () => {
        const schema = useResourceIdValidator()
        expect(schema.__validator).to.equal('api-kit/ResourceIdValidator')
    })

    it('provides a schema for resource ids', () => {
        const schema = useResourceIdValidator()
        expect(schema.$$root).to.equal(true)
        expect(schema.pattern).not.to.be.undefined
        expect(schema.pattern).not.to.be.null
        expect(schema.empty).to.be.false
        expect(schema.type).to.equal('custom')
    })

    it('validates resource ids successfully when compiled', async () => {
        const resourceIdValidator = validator.compile(useResourceIdValidator())
        const result = await resourceIdValidator(nanoid(21))
        expect(result).to.be.true
    })

    it('does not validate invalid resource ids successfully when compiled', async () => {
        const resourceIdValidator = validator.compile(useResourceIdValidator())
        const result = await resourceIdValidator(nanoid(5))
        expect(result).to.have.length(1)
        expect(result.at(0).type).to.equal('stringPattern')
    })
})