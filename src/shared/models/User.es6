'use strict'

//
// User
// Created by aallison on 10/5/15.
//

const uuid = require('../util/uuid')
const BaseModel = require('./BaseModel')

const USER_ID = 'userId'

class User extends BaseModel {
    constructor(userId) {
        super()
        this.setUserId(userId)
    }

    getUserId() {
        return this.get(USER_ID)
    }

    setUserId(userId) {
        this.set(USER_ID, userId)
        return this
    }

    static newUser() {
        return new User(uuid.getRandomUuid())
    }
}
module.exports = User
