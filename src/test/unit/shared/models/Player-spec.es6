'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Player = require('../../../../shared/models/game/Player')
const User = require('../../../../shared/models/User')
const Tile = require('../../../../shared/models/game/Tile')
const GameSetupConfig = require('../../../../shared/data/GameSetup-config')
// const Logger = require('../../../../shared/log/Logger')

describe('Player', () => {
    let user = new User()

    it('basic constructor', () => {
        let player = new Player(user)
        assert.equal('User', player.getUser().type)

        assert.equal(player.getIncome(), 0)
        assert.equal(player.getMoney(), GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        assert.equal(player.getReputation(), 0)
        assert.equal(player.getPopulation(), 0)
        assert.equal(player.getInvestmentMarkers(), GameSetupConfig.INVESTMENTS_PER_PLAYER)
        assert.equal(player.getBoard().type, 'Board')
        assert.lengthOf(player.getGoals(), 0)

        assert.equal(player.isStartingPlayer(), false)
        assert.equal(player.getTurnsComplete(), 0)
    })

    describe('placing tiles', () => {
        let player = new Player(user)

        it('.placeTile updates board with placement', () => {
            const tile = Tile.basicTiles()[0]

            const placement = player.placeTile(tile, [0, 0], 1)
            const board = player.getBoard()
            assert.equal(board.getPlacements()[0], placement)
        })

        it('.chargeForTile reduces players money when buying a tile', () => {
            let tileCost = 10
            player.chargeForTile(tileCost)
            assert.equal(player.getMoney(), GameSetupConfig.STARTING_MONEY_PER_PLAYER-tileCost) 
        })
    })

    describe('.canAfford', () => {
        let player = new Player(user)

        it('should be false if the cost of the tile is greater than players money',  () => {
            assert.isFalse(player.canAfford(100))  // Starting money is 15
        })

        it('should be true if the cost of the tile is less than or equals players money',  () => {
            assert.isTrue(player.canAfford(1))    // Starting money is 15        
        })
    })

    describe('.executeImmediateEffect', () => {
        it('should cause desired effect on player\'s stats', () => {
            let player = new Player(user)
            const suburbs = Tile.basicTiles()[0]
            assert.equal(player.getPopulation(), 0)
            player.executeImmediateEffect(suburbs)
            assert.equal(player.getPopulation(), 3)  // population bonus for suburbs is 3
        })

        it('should have no effect if there is no immediate effect', () => {
            let player = new Player(user)
            let suburbs = Tile.basicTiles()[0]
            suburbs.set('immediateEffect', {})
            assert.equal(player.getPopulation(), 0)            
        })
    })
})
