'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
const GameSetup = require('./GameSetup')
// const BaseError = require('../error/BaseError')
// const Player = require('./Player')
// const Market = require('./Market')
// const Tile = require ('./Tile')
const _ = require('underscore')

class GameState extends BaseModel {

    constructor(users) {
        super()
        this.init(users)
    }

    init(users) {
        this.setupPlayers(users)
        this.setupTilePiles()
        this.setupStartingTilesForPlayers()        
        this.setupMarket()        
        return this
    }

    getPlayers() {return this.get('players')}
    getTilePiles() {return this.get('tilePiles')}
    getMarket() {return this.get('market')}
}

_.extend(GameState.prototype, GameSetup)

module.exports = GameState