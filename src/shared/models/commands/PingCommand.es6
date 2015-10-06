'use strict'

//
// PingCommand
// Created by aallison on 10/5/15.
//

const BaseCommand = require('./BaseCommand')

class PingCommand extends BaseCommand {
    constructor(startTimeMs) {
        super()
    }

    execute(gameState, done) {
        done(null, { 'ping': true })
    }
}
module.exports = PingCommand
