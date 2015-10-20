'use strict'

//
// Player
// Created by dpekar on 10/7/15.
//

const _ = require('underscore')
// const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const Placement = require('./Placement')
const Board = require('./Board')
const GameSetupConfig = require('../../data/GameSetup-config')
const EffectExecution = require('../../mixins/EffectExecution')

class Player extends BaseModel {
    constructor(user) {
        super()
        this.set('user', user)

        this.set('income', 0)
        this.set('money', GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        this.set('numInvestmentsRemaining', GameSetupConfig.INVESTMENTS_PER_PLAYER)

        this.set('reputation', 0)
        this.set('population', 0)

        this.set('board', new Board())
        this.set('goals', [])

        this.set('startingPlayer', false)
        this.set('turnsComplete', 0)
    }

    getUser() { return this.get('user') }

    getIncome() { return this.get('income') }
    getMoney() { return this.get('money') }
    getNumInvestmentsRemaining() { return this.get('numInvestmentsRemaining') }

    getReputation() { return this.get('reputation') }
    getPopulation() { return this.get('population') }

    getBoard() { return this.get('board') }
    getGoals() { return this.get('goals') }

    isStartingPlayer() { return this.get('startingPlayer') }
    getTurnsComplete() { return this.get('turnsComplete') }

    getStats() {
        return {
            income: this.getIncome(),
            money: this.getMoney(),
            reputation: this.getReputation(),
            population: this.getPopulation(),
        }
    }

    chargeForTile(totalCost) {
        this.set('money', this.getMoney() - totalCost)
    }

    incrementStat(stat, value) {
        this.set(stat, this.get(stat) + value)
    }

    // Create a placement for the tile and execute all of the effects of placing the tile
    placeTile(tile, coords, gameState) {
        const placement = new Placement(tile, coords, gameState.getTurnNum())

        let board = this.getBoard()
        board.addPlacement(placement)
        this.set('board', board)

        let result = this.executeAllEffects(placement, gameState)
        return result
    }

    hasInvestmentsRemaining() {
        return this.getNumInvestmentsRemaining() > 0
    }

    makeInvestment(placement, gameState) {
        placement.makeInvestment()
        let result = this.executeAllEffects(placement, gameState)
        return result
    }

    // Update a player's money based on their income
    // If a player's income is < 0 reduce their income until 0 and remove population if they still owe money
    takeIncome() {
        let newMoney = this.getIncome() + this.getMoney()
        if (newMoney < 0) {
            let newPopulation = this.getPopulation() + newMoney
            this.setPopulation(newPopulation)
            this.set('money', 0)
        } else {
            this.set('money', this.getIncome() + this.getMoney())
        }
    }

    // Update a player's population based on their reputation
    updatePopulation() {
        let newPopulation = this.getReputation() + this.getPopulation()
        this.setPopulation(newPopulation)
    }

    // A player's population can never go below 0
    setPopulation(newPopulation) {
        if (newPopulation < 0) {
            this.set('population', 0)
        } else {
            this.set('population', newPopulation)
        }
    }

    canAfford(totalCost) {
        return this.getMoney() >= totalCost
    }

}

_.extend(Player.prototype, EffectExecution)

module.exports = Player
