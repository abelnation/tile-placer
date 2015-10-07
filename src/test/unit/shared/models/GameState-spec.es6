'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const GameState = require('../../../../shared/models/game/GameState')
// const Player = require('../../../../shared/models/Player')
// const Tile = require('../../../../shared/models/Tile')

describe('GameState', () => {
    it('basic constructor', () => {
        let gameState = new GameState()

        assert.equal('GameState', gameState.type)
    })
})
