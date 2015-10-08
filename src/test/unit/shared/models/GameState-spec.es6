'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
const _ = require('underscore')

const GameState = require('../../../../shared/models/game/GameState')
const User = require('../../../../shared/models/User')
// const Logger = require('../../../../shared/log/Logger')
// const Player = require('../../../../shared/models/Player')
// const Tile = require('../../../../shared/models/Tile')

describe('GameState', () => {
    const PLAYER_ID_1 = 1
    const PLAYER_ID_2 = 2

    const userIds = [PLAYER_ID_1, PLAYER_ID_2]
    let users
    let gameState

    before( () => {
        users = userIds.map( id => {
            return new User(id)
        })
        gameState = new GameState(users)
    })

    it('basic constructor', () => {
        assert.equal('GameState', gameState.type)        
    })

    it('has players associated with it', () => {
        let players = gameState.getPlayers()
        assert.lengthOf(players, userIds.length, 'there are ${userIds.length}')
        assert.equal(players[0].type, 'Player')
    })

    describe('setting up tile piles', () => {

        it('has tiles representing each category', () => {
            const tilePiles = gameState.getTilePiles()
            const piles = Object.keys(tilePiles)
            assert.deepEqual(piles, ['basicResidential', 'basicMunicipal',  'basicIndustrial', 'a',  'b',  'c'])
        })

        it('has 4 of each tile for basic piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') > -1) {
                    assert.equal(pile.length, GameState.BASIC_TILES_PER_PILE)
                }
            })
        })

        it('has appropriate number of each tile for stage piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') === -1) {
                    assert.equal(pile.length, GameState.TILES_PER_PILE)
                }
            })
        })

    })

    describe('setting up starting tiles for players', () => {

        it('each player has 3 tiles', () => {
            for (let player of gameState.getPlayers()) {
                assert.equal(player.getBoard().length, 3) // each player has 3 tile at beginning of game
            }
        })

        it('starting tiles have proper coordinates', () => {
            const players = gameState.getPlayers()
            const board = players[0].getBoard()

            let startingYCoordiate = 0
            for (let placement of board) {
                assert.deepEqual(placement.getCoords(), [0, startingYCoordiate])
                startingYCoordiate++
            }
        })
    })

})