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
const TileConfig = require('../../data/Tile-config')
const _ = require('underscore')

class GameState extends BaseModel {

    constructor(users) {
        super()
        this.set('users', users)
    }

    getUsers() {return this.get('users')}
    getTurnNum() {return this.get('turnNum')}
    getPlayers() {return this.get('players')}
    getTilePiles() {return this.get('tilePiles')}
    getMarket() {return this.get('market')}
    getCurrentPlayer() {return this.get('currentPlayer')}
    getStartingPlayer() {return this.get('startingPlayer')}

    placeLake(player, coords, marketPosition) {

        this.validateCurrentPlayer(player)

        let market = this.getMarket()

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            return BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        let realEstateCost = market.markupForPosition(marketPosition)
        if (player.getMoney() < realEstateCost) {
            return BaseError(`Player doesn't have enough money to trash that tile due to the the real estate cost.`)
        }

        let effectResults = player.placeTile(Tile.lake(), coords, this) // this executes all effects
        market.takeTile(marketPosition)

        this.completeTurn(player)
        return effectResults
    }

    buyBasicTile(player, coords, pileName, marketPosition) {

        this.validateCurrentPlayer(player)

        let tilePiles = this.getTilePiles()
        let pile = tilePiles[pileName]

        // check if coords are valid
        if (_.isEmpty(pile)) {
            return BaseError(`There aren't any ${ pile } tiles left.`)
        }

        let tile = pile.pop()
        let cost = tile.getCost()

        // throw error if player doesn't have enough
        if (player.canAfford(cost) === false) {
            return BaseError(`Player doesn't have enough money to buy that the ${ tile.getName() }.`)
        }

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            return BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        player.chargeForTile(cost)
        let effectResults = player.placeTile(tile, coords, this) // this executes all effects

        this.getMarket().takeTile(marketPosition)

        this.completeTurn(player)

        return effectResults
    }

    buyTileFromMarket(player, coords, marketPosition) {

        this.validateCurrentPlayer(player)

        let market = this.getMarket()
        let marketTiles = market.getTiles()
        const tile = marketTiles[marketPosition]
        const totalCost = tile.getCost() + market.markupForPosition(marketPosition) // HACK

        if (_.isUndefined(tile)) {
            return new BaseError(`Couldn't find a tile in the market at index ${ marketPosition }.`)
        }

        // throw error if player doesn't have enough
        if (player.canAfford(totalCost) === false) {
            return new BaseError(`Player doesn't have enough money to buy that the ${ tile.getName() } at index ${ marketPosition }.`)
        }

        // check if coords are valid
        if (player.getBoard().canPlaceOn(coords) === false) {
            return new BaseError(`${ coords } is not a valid position on player's board to place ${ tile.getName() }.`)
        }

        market.takeTile(marketPosition)
        player.chargeForTile(totalCost)
        let effectResults = player.placeTile(tile, coords, this) // this executes all effects

        this.completeTurn(player)

        return effectResults
    }

    makeInvestment(player, placement, marketPosition) {

        this.validateCurrentPlayer(player)

        let tile = placement.getTile()

        // throw error if player doesn't have any investments left
        if (player.hasInvestmentsRemaining() === false) {
            return new BaseError(`Player doesn't any investments left.`)
        }

        // throw error if player doesn't have enough
        if (placement.alreadyInvestedIn() === true) {
            return new BaseError(`Player already invested in ${ tile.getName() }.`)
        }

        let cost = tile.getCost()

        // throw error if player doesn't have enough
        if (player.canAfford(cost) === false) {
            return new BaseError(`Player doesn't have enough money to invest in ${ tile.getName() }.`)
        }

        player.chargeForTile(cost)
        let effectResults = player.makeInvestment(placement, this)

        this.getMarket().takeTile(marketPosition)
        this.completeTurn(player)

        return effectResults
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
        this.setNextPlayer()
    }

    validateCurrentPlayer(player) {
        // throw error if it isn't turn of player passed in
        if (this.getCurrentPlayer() !== player) {
            return new BaseError(`It's not user ${player.getUser().getUserId()}'s turn.`)
        }
    }

    getBasicMarketTiles() {
      let tilePiles = this.getTilePiles()

      let basicPiles = _.pick(tilePiles,
        `basic${TileConfig.CATEGORIES.RESIDENTIAL}`,
        `basic${TileConfig.CATEGORIES.MUNICIPAL}`,
        `basic${TileConfig.CATEGORIES.INDUSTRIAL}`
      )

      let basicTiles = _.values(basicPiles)
      basicTiles.push(tilePiles[TileConfig.LAKE])

      return basicTiles
    }

    incrementTurnNum() {
        let turnNum = this.getTurnNum()
        this.set('turnNum', turnNum + 1)
    }

    setNextPlayer() {
        let players = this.getPlayers()
        let currentPlayerIndex = players.indexOf(this.getCurrentPlayer())
        if (currentPlayerIndex === players.length-1) {
            this.set('currentPlayer', players[0])
        } else {
            this.set('currentPlayer', players[currentPlayerIndex+1])
        }
    }
}

_.extend(GameState.prototype, GameSetup)

module.exports = GameState
