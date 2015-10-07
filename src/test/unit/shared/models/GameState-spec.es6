'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const GameState = require('../../../../shared/models/game/GameState')
const User = require('../../../../shared/models/User')
// const Player = require('../../../../shared/models/Player')
// const Tile = require('../../../../shared/models/Tile')

describe('GameState', () => {
    it('basic constructor', () => {
        const userIds = [1,2]
        let users = userIds.map( id => {
            return new User(id)
        })

        let gameState = new GameState(users)
        let players = gameState.getPlayers()
        assert.equal('GameState', gameState.type)
        
        assert.lengthOf(players, userIds.length, 'there are ${userIds.length}')
        assert.equal(players[0].type, 'Player')
    })
})