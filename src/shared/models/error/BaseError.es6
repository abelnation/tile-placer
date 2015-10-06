'use strict'

//
// BaseError
// Created by aallison on 10/6/15.
//

const BaseModel = require('../BaseModel')

const MESSAGE = 'message'
const PARAMS = 'params'

class BaseError extends BaseModel {
    constructor(message, params) {
        super()
        this.set(MESSAGE, message)
        this.set(PARAMS, params)
    }

    getMessage() {
        return this.get(MESSAGE)
    }

    getParams() {
        return this.get(PARAMS)
    }
}
module.exports = BaseError
