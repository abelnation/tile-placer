'use strict'

//
// UserCommandRequest
// Created by aallison on 10/5/15.
//

const uuid = require('../../util/uuid')
const BaseModel = require('../BaseModel')

const USER = 'user'
const COMMAND = 'command'
const COMMAND_ID = 'commandId'

class UserCommandRequest extends BaseModel {
    constructor(user, command) {
        super()
        this.set(COMMAND_ID, uuid.getTimeBasedUuid())
        this.set(USER, user)
        this.set(COMMAND, command)
    }
}
module.exports = UserCommandRequest
