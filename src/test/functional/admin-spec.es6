'use strict'

/*eslint-disable no-unused-vars */
//
// admin-spec
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

const PORT = 8998
const AdminClient = require('../../shared/clients/api/AdminClient')
const client = new AdminClient('localhost', PORT)

const app = require('../../servers/frontend/app')

describe('Admin endpoints', () => {

    before((done) => {
        app.listen(PORT, () => {
            console.log('functional test server started')
            done()
        })
    })

    describe('/test', () => {
        it('returns response', (done) => {
            client.testAsync().then(res => {
                assert.equal('hello, world!', res.response)
                done()
            }).catch(errorResponse => {
                done(errorResponse)
            })
        })
    })
})
