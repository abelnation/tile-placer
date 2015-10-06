'use strict'

//
// GetStateCommand
// Created by aallison on 10/5/15.
//

const BaseCommand = require('../../commands/BaseCommand')

class GetStateCommand extends BaseCommand {
    constructor(guess) {
        super()
    }

    execute(gameState, done) {
        done(null, { gameState: gameState })
    }
}
module.exports = GetStateCommand
