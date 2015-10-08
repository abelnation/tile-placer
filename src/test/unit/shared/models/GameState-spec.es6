'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
const _ = require('underscore')

const GameState = require('../../../../shared/models/game/GameState')
const User = require('../../../../shared/models/User')
const Logger = require('../../../../shared/log/Logger')
// const Player = require('../../../../shared/models/Player')
// const Tile = require('../../../../shared/models/Tile')

describe('GameState', () => {
    const PLAYER_ID_1 = 1
    const PLAYER_ID_2 = 2

    const userIds = [PLAYER_ID_1, PLAYER_ID_2]
    let users
    let gameState

    before(function() {
        Logger.info('Starting GameState specs')
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
            assert.deepEqual(piles, ['basicMunicipal',  'basicIndustrial',  'basicResidential',  'a',  'b',  'c'])
        })

        it('has 4 of each tile for basic piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') > -1) {
                    pile.length === GameState.BASIC_TILES_PER_PILE
                }
            })
        })

        it('has appropriate number of each tile for stage piles', () => {
            const tilePiles = gameState.getTilePiles()
            _.each(tilePiles, (pile, stage) => {
                if (stage.indexOf('basic') === -1) {
                    pile.length === GameState.TILES_PER_PILE
                }
            })
        })

    })
})