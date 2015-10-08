'use strict'

//
// Player-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Player = require('../../../../shared/models/game/Player')
const User = require('../../../../shared/models/User')
const Tile = require('../../../../shared/models/game/Tile')

describe('Player', () => {
    let user = new User()
    let player = new Player(user)

    it('basic constructor', () => {
        assert.equal('User', player.getUser().type)

        assert.equal(player.getIncome(), 0)
        assert.equal(player.getMoney(), 15)
        assert.equal(player.getReputation(), 0)
        assert.equal(player.getPopulation(), 0)
        assert.equal(player.getInvestmentMarkers(), 4)
        assert.lengthOf(player.getBoard(), 0)
        assert.lengthOf(player.getGoals(), 0)

        assert.equal(player.isStartingPlayer(), false)
        assert.equal(player.getTurnsComplete(), 0)
    })

    describe('placing tiles', () => {

        it('updates board with placement', () => {
            const tile = Tile.basicTiles()[0]
            const placement = player.placeTile(tile, [0, 0], 1)
            const board = player.getBoard()
            assert.equal(board[0], placement)
        })
        
    })
})
