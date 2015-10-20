'use strict'

//
// GameClient
// Created by dpekar on 10/16/15.
//

const promisifyAll = require('bluebird').promisifyAll

const uuid = require('../util/uuid')
const detach = require('../util/detach')

const User = require('../models/User')
const GameState = require('../models/game/GameState')

// const EchoCommand = require('../models/game/commands/EchoCommand')
// const AddGuessCommand = require('../models/game/commands/AddGuessCommand')
// const GetStateCommand = require('../models/game/commands/GetStateCommand')


class GameClient {
    constructor() {

        this.listeners = {}

        this.user = new User(uuid.getRandomUuid())

        let gameState = new GameState([this.user])
        gameState.setupInitialGameState()

        this.gameState = gameState
        promisifyAll(this)
    }

    // addGuess(guess, done) {
    //     this.client.requestAsync(new AddGuessCommand(this.user, guess)).then(result => {
    //         detach(done, null, result)
    //     }).catch(err => {
    //         detach(done, err)
    //     })
    // }

}
module.exports = GameClient
