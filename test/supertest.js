import { fastFormats as formats } from 'ajv-formats/dist/formats.js'
import { expect } from 'chai'
import { OpenApiValidator } from 'express-openapi-validate'
import * as fs from 'node:fs'
import { default as supertest } from 'supertest'
import { default as yaml } from 'yaml'

const apiDocument = yaml.parse(fs.readFileSync('./api.yaml', 'utf-8'), {
    merge: true
})

// use a simple regex here. allow local loopback too
formats.url = /^(https?):\/\/[^\s$.?#].[^\s]*$/

const validator = new OpenApiValidator(apiDocument, {
    ajvOptions: { formats }
})

const test = ({ baseUrl = 'http://localhost:5001/discue-io-dev/europe-west3/api', path, idToken, apiKey, method = 'get', logResponse, body }, validationCallbacks, done) => {
    return new Promise((resolve, reject) => {
        const testCase = supertest(baseUrl)[method](path)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .set('X-API-KEY', apiKey ? apiKey : '')
            .set('fastly-client-ip', '192.168.2.1')
            .set('Authorization', `${idToken ? 'Bearer ' + idToken : ''}`)
            .set('x-from-hint', 'firebase')
            .send(body)
            .expect(res => {
                if (logResponse) {
                    console.log(path, res.status, JSON.stringify(res.body, null, 2))
                }
            })
            .expect(res => {
                if (res.status !== 204 && res.header['content-length'] !== '0') {
                    expect(res.header['content-type'].startsWith('application/json')).to.be.true
                }
            })

        validationCallbacks.forEach(callback => testCase.expect(callback))
        testCase.end((err) => {
            if (done) {
                done(err)
            } else if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export default ({ method = 'get', path, apiPath, ...args }, validationCallback, done) => {
    const validateResponse = validator.validateResponse(method, apiPath || path)

    const validationCallbacks = [res => {
        try {
            validateResponse(res)
        } catch (e) {
            console.log(`Validation error for ${path}`, JSON.stringify(e, null, 1))
            throw e
        }
    }, validationCallback]

    return test({ method, path, apiPath, ...args }, validationCallbacks, done)
}


export const testWithoutOpenApiValidation = (args, validationCallback, done) => {
    const validationCallbacks = [validationCallback]

    return test(args, validationCallbacks, done)
}