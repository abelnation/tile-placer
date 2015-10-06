'use strict'

//
// NetworkMessage
// Created by aallison on 9/30/15.
//

const BaseModel = require('../../BaseModel')

class NetworkMessage extends BaseModel {
    constructor(message) {
        super()
        this.setMessage(message)
    }

    getMessage() { return this.get('message') }
    setMessage(message) {
        this.set('message', message)
    }
}
module.exports = NetworkMessage
