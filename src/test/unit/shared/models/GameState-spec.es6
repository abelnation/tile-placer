'use strict'

//
// GameState-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
const _ = require('underscore')
const Logger = require('../../../../shared/log/Logger')

const GameState = require('../../../../shared/models/game/GameState')
const GameSetupConfig = require('../../../../shared/data/GameSetup-config')
const User = require('../../../../shared/models/User')
const TileConfig = require('../../../../shared/data/Tile-config')
// const Player = require('../../../../shared/models/Player')

describe('GameState', () => {
    const userIds = [1,2,3]
    let gameState

    before ( () => {
        let users = userIds.map( id => new User(id) )
        gameState = new GameState(users)
        gameState.setupInitialGameState()
    })

    it('basic constructor', () => {
        assert.equal('GameState', gameState.type)        
    })

    describe('players', () => {
        it('has players associated with it', () => {
            let players = gameState.getPlayers()
            assert.lengthOf(players, userIds.length)
            assert.equal(players[0].type, 'Player')
        })

        it('.opponents returns all players besides the one passed in', () => {
            let player1 = gameState.getPlayers()[0]
            let player2 = gameState.getPlayers()[1]
            let player3 = gameState.getPlayers()[2]
            let opponents = gameState.opponentsOf(player1)
            assert.lengthOf(opponents, 2)
            assert.notInclude(opponents, player1)
            assert.include(opponents, player2)
            assert.include(opponents, player3)

        })

    })


    describe('setting up tile piles:', () => {

        it('piles have tiles representing each category', () => {
            const tilePiles = gameState.getTilePiles()
            const piles = Object.keys(tilePiles)
            assert.deepEqual(piles, ['basicResidential', 'basicMunicipal',  'basicIndustrial', 'a',  'b',  'c'])
        })

        it('piles have 4 of each tile for basic piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') > -1) {
                    assert.equal(pile.length, GameSetupConfig.BASIC_TILES_PER_PILE)
                }
            })
        })

        it('piles have appropriate number of each tile for stage piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') === -1) {
                    if (stage === TileConfig.STAGES.B || stage === TileConfig.STAGES.C) {
                        assert.equal(pile.length, GameSetupConfig.TILES_PER_PILE)
                    }
                }
            })
        })

    })

    describe('setting up starting tiles for players:', () => {

        it('each player has 3 tiles', () => {
            for (let player of gameState.getPlayers()) {
                assert.equal(player.getBoard().getPlacements().length, 3) // each player has 3 tile at beginning of game
            }
        })

        it('starting tiles have proper coordinates', () => {
            const players = gameState.getPlayers()
            const board = players[0].getBoard()

            let startingYCoordiate = 0
            for (let placement of board.getPlacements()) {
                assert.deepEqual(placement.getCoords(), [0, startingYCoordiate])
                startingYCoordiate++
            }
        })

        it('starting players have proper stats', () => {
            const players = gameState.getPlayers()
            for (let player of players) {
                assert.equal(player.getReputation(), 1)
                assert.equal(player.getIncome(), 0)
                assert.equal(player.getPopulation(), 2)
            }            
        })

    })

    describe('setting up market:', () => {
        const TILES_IN_MARKET = 7

        it('it has correct number of tiles', () => {
            const market = gameState.getMarket()
            assert.equal(market.getTiles().length, TILES_IN_MARKET)
        })
    })

    it('.incrementTurnNum should add one to the turn number for the game', () => {
        assert.equal(gameState.getTurnNum(), 1)
        gameState.incrementTurnNum()
        assert.equal(gameState.getTurnNum(), 2)
    })


    describe('taking turns', function () {

        beforeEach( () => {
            let users = userIds.map( id => new User(id) )
            gameState = new GameState(users)
            gameState.setupInitialGameState()
        })

        describe('.buyBasicTile', () => {
            it('should place a tile at the right place', () => {
                let player = gameState.getPlayers()[0]
                gameState.buyBasicTile(player, [1,1], 'basicMunicipal')

                assert.equal(player.getIncome(), -1)
                assert.equal(player.getReputation(), 2)
                assert.equal(player.getPopulation(), 4)
                assert.equal(player.getMoney(), 10) // 15 - 4 - 1
            })

           it('should run out of tiles after 4 are taken', () => {
                let player = gameState.getPlayers()[0]
                player.set('money', 100)
                let yCoord = 1
                for (let num of [1,2,3,4]) {
                    gameState.buyBasicTile(player, [1, yCoord], 'basicMunicipal')
                    yCoord++
                }
                assert.throw(gameState.buyBasicTile)
                gameState.buyBasicTile(player, [1, yCoord], 'basicMunicipal')
            })
        })

        describe('.buyTileFromMarket', () => {
            it('should buy correct tile and place it on player\'s board', () => {
                let player = gameState.getPlayers()[0]
                player.set('money', 100)
                let tileToBuy = gameState.getMarket().getTiles()[0]
                gameState.buyTileFromMarket(player, [1,0], 0)
                let newPlacement = _.last(player.getBoard().getPlacements())
                assert.equal(tileToBuy, newPlacement.getTile())

            })

        })

        describe('.makeInvestment', () => {
            
        })

        describe('.placeLake', () => {
            
        })

        describe('.completeTurn', () => {
            
        })        
    })

})