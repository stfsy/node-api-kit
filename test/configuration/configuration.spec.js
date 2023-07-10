import { expect } from "chai"
import { apiHostname, cookiePrefix, frontendHostname, ifIsProd, isCiCd, isNonProd, isProd } from "../../lib/configuration/service.js"

describe('Configuration', () => {

    describe('.apiHostname', () => {
        it('returns default if env var is not set', () => {
            const hostname = apiHostname()
            expect(hostname).to.equal('http://localhost:5001')
        })
        it('returns value of env var', () => {
            process.env.API_HOST = 'http://api.com'
            const hostname = apiHostname()
            expect(hostname).to.equal('http://api.com')
        })
    })

    describe('.frontendHostname', () => {
        it('returns default if env var is not set', () => {
            const hostname = frontendHostname()
            expect(hostname).to.equal('http://localhost:8080')
        })
        it('returns value of env var', () => {
            process.env.API_FRONTEND_HOSTS = 'http://api.com'
            const hostname = frontendHostname()
            expect(hostname).to.equal('http://api.com')
        })
    })

    describe('.cookiePrefix', () => {
        it('returns default if env var is not set', () => {
            const hostname = cookiePrefix()
            expect(hostname).to.equal('dsq')
        })
        it('returns value of env var', () => {
            process.env.API_FRONTEND_COOKIE_PREFIX = 'api'
            const hostname = cookiePrefix()
            expect(hostname).to.equal('api')
        })
    })

    describe('.isProd', () => {
        it('returns false if env var is not set', () => {
            const prod = isProd()
            expect(prod).to.equal(false)
        })
        it('returns true if value of "NODE_ENV" is "production"', () => {
            process.env.NODE_ENV = 'production'
            const prod = isProd()
            expect(prod).to.be.true
        })
        it('returns false if value of "NODE_ENV" is not "production"', () => {
            process.env.NODE_ENV = 'development'
            const prod = isProd()
            expect(prod).to.be.false
        })
    })

    describe('.ifIsProd', () => {
        it('executes callback if "NODE_ENV" is "production"', (done) => {
            process.env.NODE_ENV = 'production'
            ifIsProd(done)
        })
        it('returns result of prod callback if "NODE_ENV" is "production"', () => {
            process.env.NODE_ENV = 'production'
            const result = ifIsProd(() => 123).orElse()
            expect(result).to.equal(123)
        })
        it('executes orElse callback if "NODE_ENV" is not "production"', (done) => {
            process.env.NODE_ENV = 'development'
            ifIsProd(() => {}).orElse(done)
        })
        it('returns result of orElse callback if "NODE_ENV" is not "production"', () => {
            process.env.NODE_ENV = 'development'
            const result = ifIsProd(() => {}).orElse(() => 456)
            expect(result).to.equal(456)
        })
    })

    describe('.isNonProd', () => {
        it('returns default if env var is not set', () => {
            const nonprod = isNonProd()
            expect(nonprod).to.equal(true)
        })
        it('returns true if value of "NODE_ENV" is "production"', () => {
            process.env.NODE_ENV = 'production'
            const nonprod = isNonProd()
            expect(nonprod).to.be.false
        })
        it('returns false if value of "NODE_ENV" is not "production"', () => {
            process.env.NODE_ENV = 'development'
            const nonprod = isNonProd()
            expect(nonprod).to.be.true
        })
    })

    describe('.isCiCd', () => {
        it('returns false if env var is not set', () => {
            process.env.GITHUB_ACTIONS = ''
            const ciCd = isCiCd()
            expect(ciCd).to.equal(false)
        })
        it('returns true if value of "NODE_ENV" is "production"', () => {
            process.env.GITHUB_ACTIONS = 'true'
            const ciCd = isCiCd()
            expect(ciCd).to.be.true
        })
    })
})