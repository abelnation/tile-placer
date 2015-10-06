'use strict'

//
// LiveClientResponse
// Created by aallison on 10/5/15.
//

const BaseModel = require('../../BaseModel')

const REQUEST = 'request'
const CONTENT = 'content'

class LiveClientResponse extends BaseModel {
    constructor(liveClientRequest, content) {
        super()
        this.set(REQUEST, liveClientRequest)
        this.set(CONTENT, content)
    }

    getRequestId() {
        return this.getRequest().getRequestId()
    }

    getRequest() {
        return this.get(REQUEST)
    }

    getContent() {
        return this.get(CONTENT)
    }
}
module.exports = LiveClientResponse
