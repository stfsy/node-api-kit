import { expect } from 'chai'
import { default as supertest } from 'supertest'

const test = ({ baseUrl = 'http://127.0.0.1:7001/', method = 'GET', path, logResponse = true, body }, validationCallbacks) => {
    return new Promise((resolve, reject) => {
        const testCase = supertest(baseUrl)[method](path)
            .set('accept', 'application/json')
            .set('content-type', 'application/json')
            .set('fastly-client-ip', '192.168.2.1')
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
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export default ({ method = 'get', path, ...args }, validationCallback) => {
    const validationCallbacks = [validationCallback]
    return test({ method, path, ...args }, validationCallbacks)
}