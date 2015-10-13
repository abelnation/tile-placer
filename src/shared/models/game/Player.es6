'use strict'

//
// Player
// Created by dpekar on 10/7/15.
//

const _ = require('underscore')
const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const Placement = require('./Placement')
const Board = require('./Board')
const GameSetupConfig = require('../../data/GameSetup-config')

class Player extends BaseModel {
    constructor(user) {
        super() 
        this.set('user', user)

        this.set('income', 0)
        this.set('money', GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        this.set('investmentMarkers', GameSetupConfig.INVESTMENTS_PER_PLAYER)

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
    getInvestmentMarkers() { return this.get('investmentMarkers') }

    getReputation() { return this.get('reputation') }
    getPopulation() { return this.get('population') }

    getBoard() { return this.get('board') }
    getGoals() { return this.get('goals') }

    isStartingPlayer() { return this.get('startingPlayer') }
    getTurnsComplete() { return this.get('turnsComplete') }

    chargeForTile(totalCost) {
        let money = this.getMoney() 
        this.set('money', money - totalCost)
    }
    
    incrementStat(stat, value) {
        this.set(stat, this.get(stat) + value)            
    }

    placeTile(tile, coords, turn) {
        const placement = new Placement(tile, coords, turn)

        let board = this.getBoard()
        board.addPlacement(placement)
        this.set('board', board)
        return placement
    }

    canAfford(totalCost) {
        return this.getMoney() >= totalCost
    }

    executeImmediateEffect(placement) {
        let tile = placement.getTile()
        let effect = tile.getImmediateEffect(this)

        if (_.isNull(effect)) {
            Logger.info(`No immediate effect for tile ${ tile.name }`)
        } else {
            effect.executeOn(this, placement)
        }
    }

    executeConditionalEffects(placement, gameState=null) {
        let tile = placement.getTile()
        let effects = tile.getConditionalEffects(this)

        if (_.isEmpty(effects)) {
            Logger.info(`No conditional effect for tile ${ tile.getName() }`)
        } else {
            for (let effect of effects) {
                effect.executeOn(this, placement, gameState)
            }
        }
    }
}
module.exports = Player