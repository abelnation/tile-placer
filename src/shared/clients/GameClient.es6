'use strict'

//
// GameClient
// Created by dpekar on 10/16/15.
//

/* eslint-disable no-unused-vars */
const promisifyAll = require('bluebird').promisifyAll
const uuid = require('../util/uuid')
const detach = require('../util/detach')
/* eslint-enable no-unused-vars */

const User = require('../models/User')
const GameState = require('../models/game/GameState')

class GameClient {
    constructor() {

        this.listeners = {}

        this.user = new User(uuid.getRandomUuid())
        // const opponent = new User(uuid.getRandomUuid())

        const gameState = new GameState([this.user])
        gameState.setupInitialGameState()

        this.gameState = gameState
        promisifyAll(this)
    }
}
module.exports = GameClient
