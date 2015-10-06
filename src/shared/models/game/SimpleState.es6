'use strict'

//
// SimpleState
// Created by aallison on 10/5/15.
//

const BaseModel = require('../BaseModel')

const CURRENT_GUESS = 'currentGuess'
const PAST_GUESSES = 'pastGuesses'

class SimpleState extends BaseModel {
    constructor() {
        super()
        this.init()
    }

    init() {
        this.set(CURRENT_GUESS, null)
        this.set(PAST_GUESSES, {})

        return this
    }

    addGuess(guess) {
        const pastGuesses = this.getPastGuesses()
        if (guess in pastGuesses) {
            throw new Exception(`${ guess } has already been guessed`)
        }

        pastGuesses[guess] = true
        this.set(CURRENT_GUESS, guess)
    }

    getPastGuesses() {
        return this.get(PAST_GUESSES)
    }

    getCurrentGuess() {
        return this.get(CURRENT_GUESS)
    }
}
module.exports = SimpleState
