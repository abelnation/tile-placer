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
    let player = new Player(user)

    it('basic constructor', () => {
        assert.equal('User', player.getUser().type)

        assert.equal(player.getIncome(), 0)
        assert.equal(player.getMoney(), GameSetupConfig.STARTING_MONEY_PER_PLAYER)
        assert.equal(player.getReputation(), 0)
        assert.equal(player.getPopulation(), 0)
        assert.equal(player.getInvestmentMarkers(), GameSetupConfig.INVESTMENTS_PER_PLAYER)
        // assert.lengthOf(player.getBoard(), )
        assert.lengthOf(player.getGoals(), 0)

        assert.equal(player.isStartingPlayer(), false)
        assert.equal(player.getTurnsComplete(), 0)
    })

    describe('placing tiles', () => {

        it('.placeTile updates board with placement', () => {
            const tile = Tile.basicTiles()[0]

            const placement = player.placeTile(tile, [0, 0], 1)
            const board = player.getBoard()
            assert.equal(board.getPlacements()[0], placement)
        })
        
        it('.coordsOccupied returns false if there is no placement on the coords', () => {
            player.coords

        })

        it('.coordsOccupied returns true if there is already a placement on the coords', () => {
            player

        })
    })
})
