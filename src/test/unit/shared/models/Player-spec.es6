'use strict'

//
// Player-spec
// Created by aallison on 10/7/15.
//

const assert = require('chai').assert

const Player = require('../../../../shared/models/game/Player')
const User = require('../../../../shared/models/User')

describe('Player', () => {
    it('basic constructor', () => {
        let user = new User()
        let player = new Player(user)

        console.log(user)
        console.log(player)
        // assert.typeOf(player.getUser, 'User')
        assert.equal(player.getIncome(), 0)
        assert.equal(player.getMoney(), 15)
        assert.equal(player.getReputation(), 0)
        assert.equal(player.getPopulation(), 0)
        assert.lengthOf(player.getBoard(), 0)
        assert.lengthOf(player.getGoals(), 0)

        assert.equal(player.isStartingPlayer(), false)
        assert.equal(player.getTurnsComplete(), 0)
    })
})
