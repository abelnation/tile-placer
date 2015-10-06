'use strict'

//
// AddGuessCommand
// Created by aallison on 10/5/15.
//

const BaseCommand = require('../../commands/BaseCommand')

const GUESS = 'guess'

class AddGuessCommand extends BaseCommand {
    constructor(guess) {
        super()
        this.set(GUESS, guess)
    }

    execute(simpleGameState, done) {
        if (!(simpleGameState instanceof SimpleState)) {
            throw new Error(`command not allowed for ${ typeof simpleGameState }`)
        }

        try {
            simpleGameState.addGuess(this.get(GUESS))
            done(null, { gameState: simpleGameState })
        } catch (e) {
            done({ gameState: simpleGameState, error: e })
        }
    }
}
module.exports = AddGuessCommand
