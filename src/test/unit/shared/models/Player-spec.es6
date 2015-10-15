'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
// const Logger = require('../../../../shared/log/Logger')

const Player = require('../../../../shared/models/game/Player')
const Placement = require('../../../../shared/models/game/Placement')
const User = require('../../../../shared/models/User')
const Tile = require('../../../../shared/models/game/Tile')
const GameState = require('../../../../shared/models/game/GameState')
const GameSetupConfig = require('../../../../shared/data/GameSetup-config')
const StatsConfig = require('../../../../shared/data/Stats-config')

describe('Player', () => {
    let user = new User()

    it('basic constructor', () => {
        let player = new Player(user)
        assert.equal('User', player.getUser().type)

        assert.equal(player.getIncome(), 0)
        assert.equal(player.getMoney(), GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        assert.equal(player.getReputation(), 0)
        assert.equal(player.getPopulation(), 0)
        assert.equal(player.getNumInvestmentsRemaining(), GameSetupConfig.INVESTMENTS_PER_PLAYER)
        assert.equal(player.getBoard().type, 'Board')
        assert.lengthOf(player.getGoals(), 0)

        assert.equal(player.isStartingPlayer(), false)
        assert.equal(player.getTurnsComplete(), 0)
    })

    describe('placing tiles', () => {
        let player = new Player(user)

        it('.placeTile updates board with placement', () => {
            const tile = Tile.basicTiles()[0] // suburbs
            let users = [1,2,3].map( id =>  new User(id))
            let gameState = new GameState(users)

            const result = player.placeTile(tile, [0, 0], gameState)
            const board = player.getBoard()
            assert.equal(board.getPlacements()[0].getTile(), tile)

            assert.lengthOf(result, 1)
        })

        it('.chargeForTile reduces players money when buying a tile', () => {
            let tileCost = 10
            player.chargeForTile(tileCost)
            assert.equal(player.getMoney(), GameSetupConfig.STARTING_MONEY_PER_PLAYER-tileCost) 
        })
    })

    describe('.incrementStat updates whatever stat is passed in', () => {
        let player = new Player(user)
        player.incrementStat(StatsConfig.STATS.INCOME, 1) 
        assert.equal(player.getIncome(), 1)        
        player.incrementStat(StatsConfig.STATS.INCOME, -3) 
        assert.equal(player.getIncome(), -2)        
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

    describe('.takeIncome', () => {
        it('should increase the amount of money a player has by their income', () => {
            let player = new Player(user)
            assert.equal(player.getIncome(), 0)
            assert.equal(player.getMoney(), 15)

            player.takeIncome()
            assert.equal(player.getIncome(), 0)
            assert.equal(player.getMoney(), 15)

            player.incrementStat(StatsConfig.STATS.INCOME, 5)
            player.takeIncome()
            assert.equal(player.getIncome(), 5)
            assert.equal(player.getMoney(), 20)
        })

        it('should decrease the amount of money a player has if their income is negative', () => {
            let player = new Player(user)
            player.incrementStat(StatsConfig.STATS.INCOME, -3)
            player.takeIncome()
            assert.equal(player.getMoney(), 12)
        })

        it('should decrease the player\s population if they run out of money', () => {
            let player = new Player(user)
            player.set('money', 0)
            player.set('population', 5)
            player.incrementStat(StatsConfig.STATS.INCOME, -3)
            player.takeIncome()

            assert.equal(player.getMoney(), 0)
            assert.equal(player.getPopulation(), 2)
        })

    })

    describe('.updatePopulation', () => {
        it('should increase a player\'s population by their reputation', () => {
            let player = new Player(user)
            assert.equal(player.getReputation(), 0)
            assert.equal(player.getPopulation(), 0)

            player.incrementStat(StatsConfig.STATS.REPUTATION, 5)
            player.updatePopulation()
            assert.equal(player.getReputation(), 5)
            assert.equal(player.getPopulation(), 5)

        })

        it('shouldn\'t ever move population to below 0', () => {
            let player = new Player(user)

            player.incrementStat(StatsConfig.STATS.REPUTATION, -5)
            player.updatePopulation()
            assert.equal(player.getReputation(), -5)
            assert.equal(player.getPopulation(), 0)

        })
    })    

    describe('.executeImmediateEffect', () => {
        it('should cause desired effect on player\'s stats', () => {
            let player = new Player(user)
            const suburbs = Tile.basicTiles()[0]
            let placement = new Placement(suburbs, [0,0], 1)
            assert.equal(player.getPopulation(), 0)
            player.executeImmediateEffect(placement)
            assert.equal(player.getPopulation(), 2)  // population bonus for suburbs is 2
        })

        it('should have no effect if there is no immediate effect', () => {
            let player = new Player(user)
            let suburbs = Tile.basicTiles()[0]
            suburbs.set('immediateEffect', {})
            assert.equal(player.getPopulation(), 0)            
        }) 
    })

    describe('.executeAdjacentTileEffects', () => {
        it('properly updates player stats when an adjacent effect activates', () =>{
            let player = new Player(user)
            const fancy = Tile.findByName('Fancy Restaurant')
            let placement = new Placement(fancy, [0,0], 1)
            player.getBoard().addPlacement(placement)
            player.executeImmediateEffect(placement)
            assert.equal(player.getIncome(), 3)  // Income boost for fancy rest is 3

            const fastFood = Tile.findByName('Fast Food Restaurant')
            let ffPlacement = new Placement(fastFood, [0,1], 2)
            player.getBoard().addPlacement(ffPlacement)
            player.executeImmediateEffect(ffPlacement)
            player.executeAdjacentTileEffects(ffPlacement)
 
            assert.equal(player.getIncome(), 3)  // -1 for fancy rest del          
        })        
    })

})
