'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

// const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const GameSetup = require('../../mixins/GameSetup')
const BaseError = require('../error/BaseError')
// const Player = require('./Player')
// const Market = require('./Market')
const Tile = require ('./Tile')
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
        let market = this.getMarket()

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            throw new BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        let realEstateCost = market.markupForPosition(marketPosition)
        if (player.getMoney() < realEstateCost) {
            throw new BaseError(`Player doesn't have enough money to trash that tile due to the the real estate cost.`)
        }

        let tile = Tile.lake()
        player.placeTile(tile, coords, this) // this executes all effects
        market.takeTile(marketPosition)

        this.completeTurn(player)
    }

    buyBasicTile(player, coords, pileName) {
        let tilePiles = this.getTilePiles()
        let pile = tilePiles[pileName]

        // check if coords are valid
        if (_.isEmpty(pile)) {
            throw new BaseError(`There aren't any ${ pile } tiles left.`)
        }

        let tile = pile.pop()
        let cost = tile.getCost()

        // throw error if player doesn't have enough
        if (player.canAfford(cost) === false) {
            throw new BaseError(`Player doesn't have enough money to buy that the ${ tile.getName() }.`)
        }

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            throw new BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        player.chargeForTile(cost)
        player.placeTile(tile, coords, this) // this executes all effects

        this.completeTurn(player)
    }

    buyTileFromMarket(player, coords, marketPosition) {
        let market = this.getMarket()
        let marketTiles = market.getTiles() 
        const tile = marketTiles[marketPosition]
        const totalCost = tile.getCost() + market.markupForPosition(marketPosition) // HACK

        if (_.isUndefined(tile)) {
            throw new BaseError(`Couldn't find a tile in the market at index ${ marketPosition }.`)
        }

        // throw error if player doesn't have enough
        if (player.canAfford(totalCost) === false) {
            throw new BaseError(`Player doesn't have enough money to buy that the ${ tile.getName() } at index ${ marketPosition }.`)
        }

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            throw new BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        market.takeTile(marketPosition)
        player.chargeForTile(totalCost)
        player.placeTile(tile, coords, this) // this executes all effects

        this.completeTurn(player)
    }

    makeInvestment(player, placement, marketPosition) {
        let tile = placement.getTile()

        // throw error if player doesn't have any investments left 
        if (player.getNumInvestmentsRemaining() === 0) {
            throw new BaseError(`Player doesn't any investments left.`)
        }

        // throw error if player doesn't have enough
        if (placement.getInvestedIn() === true) {
            throw new BaseError(`Player already invested in ${ tile.getName() }.`)
        }

        let cost = tile.getCost()

        // throw error if player doesn't have enough
        if (player.canAfford(cost) === false) {
            throw new BaseError(`Player doesn't have enough money to invest in ${ tile.getName() }.`)
        }

        player.chargeForTile(cost)
        player.makeInvestment(placement, this)

        this.getMarket().takeTile(marketPosition)
        this.completeTurn(player)
    }

    opponentsOf(player) {
        let allPlayers = this.getPlayers()
        return  _.filter(allPlayers, (playerX) => {
            return playerX !== player                        
        })
    }

    completeTurn(player) {
        player.takeIncome()
        player.updatePopulation() 

        this.getMarket().fillUpSlots(this.getTilePiles())

        this.incrementTurnNum()
    }

    incrementTurnNum() {
        let turnNum = this.getTurnNum()
        this.set('turnNum', turnNum + 1)
    }
}

_.extend(GameState.prototype, GameSetup)

module.exports = GameState