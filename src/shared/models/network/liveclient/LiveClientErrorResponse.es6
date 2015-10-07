'use strict'

//
// LiveClientErrorResponse
// Created by aallison on 10/6/15.
//

const BaseModel = require('../../BaseModel')

const REQUEST = 'request'
const ERROR = 'error'

class LiveClientErrorResponse extends BaseModel {
    constructor(liveClientRequest, error) {
        super()
        this.set(REQUEST, liveClientRequest)

        if (error instanceof Error) {
            error = error.message
        }

        this.set(ERROR, error)
    }

    getRequestId() {
        return this.getRequest().getRequestId()
    }

    getRequest() {
        return this.get(REQUEST)
    }

    getError() {
        return this.get(ERROR)
    }
}
module.exports = LiveClientErrorResponse
