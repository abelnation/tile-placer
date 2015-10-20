'use strict'

//
// User
// Created by aallison on 10/5/15.
//

const uuid = require('../util/uuid')
const BaseModel = require('./BaseModel')
const Chance = require('chance')
const USER_ID = 'userId'



class User extends BaseModel {
    constructor(userId, name) {
        super()
        this.setUserId(userId)
        let chance = new Chance()
        this.set('name', name || chance.first())
    }

    getUserId() {
        return this.get(USER_ID)
    }

    getName() {
        return this.get('name')
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
