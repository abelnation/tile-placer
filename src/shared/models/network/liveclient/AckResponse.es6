'use strict'

//
// AckResponse
// Created by aallison on 10/6/15.
//

const Constants = require('../../../Constants')
const LiveClientResponse = require('./LiveClientResponse.es6')

class AckResponse extends LiveClientResponse {
    constructor(liveClientRequest) {
        super(liveClientRequest, Constants.ACK)
    }
}
module.exports = AckResponse
