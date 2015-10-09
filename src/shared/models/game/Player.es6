'use strict'

//
// Player
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
const Placement = require('./Placement')
const GameSetupConfig = require('../../data/GameSetup-config')
// const Logger = require('../../log/Logger')

class Player extends BaseModel {
    constructor(user) {
        super()
        this.set('user', user)

        this.set('income', 0)
        this.set('money', GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        this.set('investmentMarkers', GameSetupConfig.INVESTMENTS_PER_PLAYER)

        this.set('reputation', 0)
        this.set('population', 0)

        this.set('board', [])
        this.set('goals', [])

        this.set('startingPlayer', false)
        this.set('turnsComplete', 0)
    }

    getUser() { return this.get('user') }

    getIncome() { return this.get('income') }
    getMoney() { return this.get('money') }
    getInvestmentMarkers() { return this.get('investmentMarkers') }

    getReputation() { return this.get('reputation') }
    getPopulation() { return this.get('population') }

    getBoard() { return this.get('board') }
    getGoals() { return this.get('goals') }

    isStartingPlayer() { return this.get('startingPlayer') }
    getTurnsComplete() { return this.get('turnsComplete') }

    placeTile(tile, coords, turn) {
        const placement = new Placement(tile, coords, turn)
        let board = this.getBoard()
        board.push(placement)
        this.set('board', board)
        return placement
    }
}
module.exports = Player