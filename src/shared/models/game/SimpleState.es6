'use strict'

//
// SimpleState
// Created by aallison on 10/5/15.
//

const BaseModel = require('../BaseModel')
const BaseError = require('../error/BaseError')
const Guess = require ('./Guess')

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

    addGuessForPlayer(player, guess) {
        const pastGuesses = this.getPastGuesses()
        if (guess in pastGuesses) {
            throw new BaseError(`${ guess } has already been guessed`)
        }

        const guessObj = new Guess(player, guess)
        pastGuesses[guess] = guessObj
        this.set(CURRENT_GUESS, guessObj)
    }

    getPastGuesses() {
        return this.get(PAST_GUESSES)
    }

    getCurrentGuess() {
        return this.get(CURRENT_GUESS)
    }
}
module.exports = SimpleState
