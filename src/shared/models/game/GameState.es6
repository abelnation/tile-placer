'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
const GameSetup = require('./GameSetup')
const BaseError = require('../error/BaseError')
// const Player = require('./Player')
// const Market = require('./Market')
// const Tile = require ('./Tile')
const _ = require('underscore')

class GameState extends BaseModel {

    constructor(users) {
        super()
        this.set('users', users)
    }

    setupInitialGameState() { 
        this.set('turnNum', 1)
        this.setupPlayers()
        this.setupTilePiles()
        this.setupStartingTilesForPlayers()        
        this.setupMarket()        
        return this
    }

    getUsers() {return this.get('users')}
    getTurnNum() {return this.get('turnNum')}
    getPlayers() {return this.get('players')}
    getTilePiles() {return this.get('tilePiles')}
    getMarket() {return this.get('market')}

    placeLake(player, coords, marketPosition) {
        // throw error if player doesn't have money to pay real estate cost
        // remove tile from market

        this.incrementTurnNum()
    }

    buyBasicTile(player, pile) {
        //throw error if there are no tiles left in basic pile
        // throw error if player doesn't have enough
        this.incrementTurnNum()
    }

    totalCostOfTile(marketPosition) {
        let market = this.getMarket()
        let tile = market.getTiles()[marketPosition]
        let totalCost = tile.cost + market.markupForIndex(marketPosition)
        return totalCost
    }

    buyTileFromMarket(player, coords, marketPosition) {
        let market = this.getMarket()
        const tile = market[marketPosition]
        const totalCost = this.totalCostOfTile(marketPosition)

        if (typeOf(tile) === 'undefined') {
            throw new BaseError(`Couldn't find a tile in the market at index ${ marketPosition }.`)
        }

        // throw error if player doesn't have enough
        if (player.canAfford(totalCost) === false) {
            throw new BaseError(`Player doesn't have enough money to buy that the ${ tile.name } at index ${ marketPosition.name }.`)
        }

        // check if coords are valid
        if (player.canPlaceOn(coords) === false) {
            throw new BaseError(`${ coords } is not a valid position on player's board to place ${ tile.name }.`)
        }

        player.chargeForTile(totalCost)
        player.placeTile(tile, coords, this) // this executes all effects

        // collect player’s money & population
        // update market

        this.incrementTurnNum()
    }

    makeInvestment(placement, player) {
        // throw error if player doesn't have enough

        // place an investment token on a tile on player’s board
        // commence effects of new tile
        // collect player’s money & population
        // remove tile from market
        // update market
        this.incrementTurnNum()
    }

    incrementTurnNum() {
        let turnNum = this.getTurnNum()
        this.set('turnNum', turnNum + 1)
    }
}

_.extend(GameState.prototype, GameSetup)

module.exports = GameState