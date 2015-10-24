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
const MarketConfig = require('../../../../shared/data/Market-config')
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
        Logger.info('state:', gameState)
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
            const basicRes = `basic${TileConfig.CATEGORIES.RESIDENTIAL}`
            const basicMun = `basic${TileConfig.CATEGORIES.MUNICIPAL}`
            const basicInd = `basic${TileConfig.CATEGORIES.INDUSTRIAL}`

            const tilePiles = gameState.getTilePiles()
            const piles = Object.keys(tilePiles)
            assert.deepEqual(piles, [basicRes, basicMun, basicInd, 'a',  'b',  'c'])
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

        it('one of the players is set to starting player', () => {
            const players = gameState.getPlayers()
            const startingPlayer = gameState.getStartingPlayer()
            assert.include(players,startingPlayer)
        })

        it('the same player is set to current player', () => {
            const startingPlayer = gameState.getStartingPlayer()
            const currentPlayer = gameState.getCurrentPlayer()
            assert.equal(startingPlayer, currentPlayer)
        })
    })

    describe('.getBasicMarketTiles', function () {
        it('returns sets of basic tiles & lakes', function () {
          let basicTiles = gameState.getBasicMarketTiles()
          assert.lengthOf(basicTiles, 4)
          assert.equal(basicTiles[3][0].getName(), 'Lake')
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
                let player = gameState.getCurrentPlayer()
                const basicMun = `basic${TileConfig.CATEGORIES.MUNICIPAL}`
                gameState.buyBasicTile(player, [1,1], basicMun)

                assert.equal(player.getIncome(), -1)
                assert.equal(player.getReputation(), 2)
                assert.equal(player.getPopulation(), 4)
                assert.equal(player.getMoney(), 10) // 15 - 4 - 1
            })

           it('should run out of tiles after 4 are taken', () => {
                const basicMun = `basic${TileConfig.CATEGORIES.MUNICIPAL}`
 
                for (let yCoord of [1,1,1,2]) { // 3 players get coords, [1,1]
                    let player = gameState.getCurrentPlayer()
                    player.set('money', 100)
                    gameState.buyBasicTile(player, [1, yCoord], basicMun)
                }
                assert.throw(() => {
                    gameState.buyBasicTile(player, [1, yCoord], basicMun)
                })
            })
        })

        describe('.buyTileFromMarket', () => {
            it('should buy correct tile and place it on player\'s board', () => {
                let player = gameState.getCurrentPlayer()
                player.set('money', 100)
                let tileToBuy = gameState.getMarket().getTiles()[0]
                gameState.buyTileFromMarket(player, [1,1], 0)
                let newPlacement = _.last(player.getBoard().getPlacements())
                assert.equal(tileToBuy, newPlacement.getTile())
            })

        })

        describe('.makeInvestment', () => {
            it('should double the effect of invested tile', () => {
                let player = gameState.getCurrentPlayer()
                let park = player.getBoard().getPlacements()[1]
                gameState.makeInvestment(player, park, 0)

                assert.equal(player.getReputation(), 2)
                assert.equal(player.getIncome(), -1)
                assert.equal(player.getMoney(), 10) // 15 - 5 = 10
            })

            it('should double the effect of invested tile when future tiles are played ', () => {
                let player = gameState.getCurrentPlayer()
                let park = player.getBoard().getPlacements()[1]
                gameState.makeInvestment(player, park, 0)
                gameState.set('currentPlayer', player)

                const basicRes = `basic${TileConfig.CATEGORIES.RESIDENTIAL}`
                gameState.buyBasicTile(player,[1,1], basicRes)
                assert.equal(player.getReputation(), 4)
            })

            it('should mark the placement as invested in', () => {
                let player = gameState.getCurrentPlayer()
                let park = player.getBoard().getPlacements()[1]
                assert.isFalse(park.alreadyInvestedIn())
                gameState.makeInvestment(player, park, 0)
                assert.isTrue(park.alreadyInvestedIn())
            })
        })

        describe('.placeLake', () => {
            it('should award player the correct amount of money', () => {
                let player = gameState.getCurrentPlayer()
                gameState.placeLake(player, [1,1], 0)

                assert.equal(player.getMoney(), 19)
                assert.lengthOf(gameState.getMarket().getTiles(), MarketConfig.NUM_SLOTS)
            })
        })

        describe('.completeTurn', () => {

            it('should assign the next player ', function () {
                let player = gameState.getStartingPlayer()
                const basicMun = `basic${TileConfig.CATEGORIES.MUNICIPAL}`
                gameState.buyBasicTile(player, [1,1], basicMun) // this runs .completeTurn

                let players = gameState.getPlayers()
                let currentPlayer =  gameState.getCurrentPlayer()
                assert.include(players, currentPlayer)
                assert.notEqual(player, currentPlayer)
            })

            it('should keep track of turn order', function () {
                let player = gameState.getStartingPlayer()
                assert.equal(gameState.getTurnNum(), 1)
                const basicMun = `basic${TileConfig.CATEGORIES.MUNICIPAL}`
                gameState.buyBasicTile(player, [1,1], basicMun) // this runs .completeTurn
                assert.equal(gameState.getTurnNum(), 2)
            })
        })
    })

})
