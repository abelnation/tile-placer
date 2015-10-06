'use strict'

//
// api-v1
// Created by aallison on 9/30/15.
//

const detach = require('../../util/detach')
const BaseClient = require('./BaseClient')

const API_PREFIX = '/admin'

class AdminClient extends BaseClient {

    constructor(host = 'localhost', port = '8000') {
        super(API_PREFIX, host, port)
    }

    test(done) {
        const route = 'test'
        this.get(route)
            .end((err, res) => {

                const errorResponse = this.getErrorResponse(err, res)
                if (errorResponse) {
                    return detach(done, errorResponse)
                }

                let { body, text } = res

                detach(done, null, body || text)
            })
    }
}

module.exports = AdminClient
