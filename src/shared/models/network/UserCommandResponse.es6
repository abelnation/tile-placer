'use strict'

//
// UserCommandResponse
// Created by aallison on 10/5/15.
//

const BaseModel = require('../BaseModel')

const STATUS_OK = 'ok'
// const STATUS_FAIL = 'fail'

const COMMAND_REQ = 'userCommandRequest'
const STATUS = 'status'
const DATA = 'data'

class UserCommandResponse extends BaseModel {
    constructor(userCommandRequest, status = STATUS_OK, data = {}) {
        super()
        this.set(COMMAND_REQ, userCommandRequest)
        this.set(STATUS, status)
        this.set(DATA, data)
    }
}
module.exports = UserCommandResponse
