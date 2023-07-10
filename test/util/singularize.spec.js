import { expect } from "chai";
import singularize from "../../lib/util/singularize.js";

describe('Singularize', () => {

    it('singularizes the word ghosts', () => {
        expect(singularize('ghosts')).to.equal('ghost')
    })

    it('singularizes the word aliases', () => {
        expect(singularize('aliases')).to.equal('alias')
    })

    it('singularizes the word churches', () => {
        expect(singularize('churches')).to.equal('church')
    })

    it('singularizes the word fishes', () => {
        expect(singularize('fishes')).to.equal('fish')
    })

    it('singularizes the wird boxes', () => {
        expect(singularize('boxes')).to.equal('box')
    })

    it('singularizes the word busses', () => {
        expect(singularize('busses')).to.equal('bus')
    })
    
    it('throws if word seems to be singular', () => {
        expect(() => {
            singularize('winter')
        }).to.throw()
    })
})