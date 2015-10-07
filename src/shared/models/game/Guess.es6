'use strict'

//
// Guess
// Created by aallison on 10/6/15.
//

const BaseModel = require('../BaseModel')

class Guess extends BaseModel {
    constructor(player, guess) {
        super()
        this.set('player', player)
        this.set('guess', guess)
    }

    getPlayer() { return this.get('player') }
    getGuess() { return this.get('guess') }
}
module.exports = Guess
