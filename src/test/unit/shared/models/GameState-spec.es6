'use strict'

//
// GameState-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
const _ = require('underscore')
// const Logger = require('../../../../shared/log/Logger')

const GameState = require('../../../../shared/models/game/GameState')
const GameSetupConfig = require('../../../../shared/data/GameSetup-config')
const User = require('../../../../shared/models/User')
const TileConfig = require('../../../../shared/data/Tile-config')
// const Player = require('../../../../shared/models/Player')

describe('GameState', () => {
    const PLAYER_ID_1 = 1

    const userIds = [PLAYER_ID_1]
    let users
    let gameState

    before( () => {
        users = userIds.map( id => new User(id) )
        gameState = new GameState(users)
        gameState.setupInitialGameState()
    })

    it('basic constructor', () => {
        assert.equal('GameState', gameState.type)        
    })

    it('has players associated with it', () => {
        let players = gameState.getPlayers()
        assert.lengthOf(players, userIds.length)
        assert.equal(players[0].type, 'Player')
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


    describe('print Gamestate', function () {
        it('should look as expected', () => {
            // Logger.info('Printing GameState for manual inspection', gameState)
        })
    })

})