'use strict'

//
// LiveClientRequest
// Created by aallison on 10/5/15.
//

const uuid = require('../../../util/uuid')
const BaseModel = require('../../BaseModel')

const REQUEST_ID = 'requestId'
const CONTENT = 'content'

class LiveClientRequest extends BaseModel {
    constructor(content) {
        super()
        this.set(REQUEST_ID, uuid.getTimeBasedUuid())
        this.set(CONTENT, content)
    }

    getRequestId() {
        return this.get(REQUEST_ID)
    }

    getContent() {
        return this.get(CONTENT)
    }
}
module.exports = LiveClientRequest
