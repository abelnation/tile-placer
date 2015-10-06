'use strict'

//
// RequestAckCommand
// Created by aallison on 10/6/15.
//

const BaseCommand = require('./BaseCommand')

class RequestAckCommand extends BaseCommand {
    constructor() {
        super()
    }


    execute(gameState, done) {
        done(null, { 'ack': true })
    }
}
module.exports = RequestAckCommand
