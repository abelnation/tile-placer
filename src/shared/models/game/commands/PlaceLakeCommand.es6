'use strict'

//
// AddGuessCommand
// Created by aallison on 10/5/15.
//

const BaseError = require('../../error/BaseError')
const PlayerCommand = require('../../commands/PlayerCommand')
const SimpleState = require('../../game/SimpleState')

const GUESS = 'guess'

class AddGuessCommand extends PlayerCommand {
    constructor(player, guess) {
        super(player)
        this.set(GUESS, guess)
    }

    getGuess() { return this.get(GUESS) }

    execute(simpleGameState, done) {
        if (!(simpleGameState instanceof SimpleState)) {
            throw new BaseError(`command not allowed for ${ typeof simpleGameState }`)
        }

        try {
            simpleGameState.addGuessForPlayer(this.getPlayer(), this.getGuess())
            done(null, simpleGameState)
        } catch (e) {
            done(e)
        }
    }
}
module.exports = AddGuessCommand
