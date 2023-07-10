import { expect } from "chai"
import { sendBadRequest, sendConflict, sendInternalError, sendMethodNotAllowed, sendNotFound, sendNotImplemented, sendPaymentRequired, sendTooManyRequests, sendUnauthorized, sendUnprocessableEntiy, sendUnsupportedMedia } from "../../lib/http/send-http-error.js"
import responseMock from "../middlewares/response-mock.js"

describe('SendHttpError', () => {

    describe('.sendBadRequest', () => {
        it('sends status 400 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(400)
                    expect(response._status()).to.equal(400)
                    expect(title).to.equal('Bad Request')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendBadRequest(response)
        })
        it('sends status 400 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(400)
                    expect(status).to.equal(400)
                    expect(title).to.equal('Bad Request')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendBadRequest(response, { hello: 'world' })
        })
    })

    describe('.sendUnauthorized', () => {
        it('sends status 401 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(401)
                    expect(response._status()).to.equal(401)
                    expect(title).to.equal('Unauthorized')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendUnauthorized(response)
        })
        it('sends status 401 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(401)
                    expect(status).to.equal(401)
                    expect(title).to.equal('Unauthorized')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendUnauthorized(response, { hello: 'world' })
        })
    })
   
    describe('.sendPaymentRequired', () => {
        it('sends status 402 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(402)
                    expect(response._status()).to.equal(402)
                    expect(title).to.equal('Payment Required')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendPaymentRequired(response)
        })
        it('sends status 402 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(402)
                    expect(status).to.equal(402)
                    expect(title).to.equal('Payment Required')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendPaymentRequired(response, { hello: 'world' })
        })
    })
 
    describe('.sendNotFound', () => {
        it('sends status 404 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(404)
                    expect(response._status()).to.equal(404)
                    expect(title).to.equal('Not Found')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendNotFound(response)
        })
        it('sends status 404 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(404)
                    expect(status).to.equal(404)
                    expect(title).to.equal('Not Found')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendNotFound(response, { hello: 'world' })
        })
    })
 
    describe('.sendMethodNotAllowed', () => {
        it('sends status 405 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(405)
                    expect(response._status()).to.equal(405)
                    expect(title).to.equal('Method Not Allowed')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendMethodNotAllowed(response)
        })
        it('sends status 405 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(405)
                    expect(status).to.equal(405)
                    expect(title).to.equal('Method Not Allowed')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendMethodNotAllowed(response, { hello: 'world' })
        })
    })

    describe('.sendConflict', () => {
        it('sends status 409 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(409)
                    expect(response._status()).to.equal(409)
                    expect(title).to.equal('Conflict')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendConflict(response)
        })
        it('sends status 409 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(409)
                    expect(status).to.equal(409)
                    expect(title).to.equal('Conflict')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendConflict(response, { hello: 'world' })
        })
    })
 
    describe('.sendUnsupportedMedia', () => {
        it('sends status 415 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(415)
                    expect(response._status()).to.equal(415)
                    expect(title).to.equal('Unsupported Media Type')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendUnsupportedMedia(response)
        })
        it('sends status 415 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(415)
                    expect(status).to.equal(415)
                    expect(title).to.equal('Unsupported Media Type')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendUnsupportedMedia(response, { hello: 'world' })
        })
    })
 
    describe('.sendUnprocessableEntiy', () => {
        it('sends status 422 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(422)
                    expect(response._status()).to.equal(422)
                    expect(title).to.equal('Unprocessable Entity')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendUnprocessableEntiy(response)
        })
        it('sends status 422 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(422)
                    expect(status).to.equal(422)
                    expect(title).to.equal('Unprocessable Entity')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendUnprocessableEntiy(response, { hello: 'world' })
        })
    })
  
    describe('.sendTooManyRequests', () => {
        it('sends status 429 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(429)
                    expect(response._status()).to.equal(429)
                    expect(title).to.equal('Too Many Requests')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendTooManyRequests(response)
        })
        it('sends status 429 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(429)
                    expect(status).to.equal(429)
                    expect(title).to.equal('Too Many Requests')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendTooManyRequests(response, { hello: 'world' })
        })
    })

    describe('.sendInternalError', () => {
        it('sends status 500 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(500)
                    expect(response._status()).to.equal(500)
                    expect(title).to.equal('Internal Server Error')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendInternalError(response)
        })
        it('sends status 500 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(500)
                    expect(status).to.equal(500)
                    expect(title).to.equal('Internal Server Error')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendInternalError(response, { hello: 'world' })
        })
    })

    describe('.sendNotImplemented', () => {
        it('sends status 501 without details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(status).to.equal(501)
                    expect(response._status()).to.equal(501)
                    expect(title).to.equal('Not Implemented')
                    expect(details).to.be.undefined
                    done()
                }
            })

            sendNotImplemented(response)
        })
        it('sends status 501 with details', (done) => {
            const response = responseMock({
                send: (responseString) => {
                    const { status, title, details } = JSON.parse(responseString)
                    expect(response._status()).to.equal(501)
                    expect(status).to.equal(501)
                    expect(title).to.equal('Not Implemented')
                    expect(details.hello).to.equal('world')
                    done()
                }
            })

            sendNotImplemented(response, { hello: 'world' })
        })
    })
})