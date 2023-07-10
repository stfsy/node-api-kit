import { expect } from "chai";
import pluralize from "../../lib/util/pluralize.js";

describe('Pluralize', () => {

    it('pluralizes the word ghost', () => {
        expect(pluralize('ghost')).to.equal('ghosts')
    })

    it('pluralizes the word alias', () => {
        expect(pluralize('alias')).to.equal('aliases')
    })

    it('pluralizes the word church', () => {
        expect(pluralize('church')).to.equal('churches')
    })

    it('pluralizes the word fish', () => {
        expect(pluralize('fish')).to.equal('fishes')
    })

    it('pluralizes the wird box', () => {
        expect(pluralize('box')).to.equal('boxes')
    })
})