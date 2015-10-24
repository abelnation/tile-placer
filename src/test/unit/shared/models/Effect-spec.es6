'use strict'

//
// effect-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
// const _ = require('underscore')
// const Logger = require('../../../../shared/log/Logger')

const User = require('../../../../shared/models/User')
const GameState = require('../../../../shared/models/game/GameState')
// const Player = require('../../../../shared/models/game/Player')
const Tile = require('../../../../shared/models/game/Tile')
const Effect = require('../../../../shared/models/game/Effect')
const StatsConfig = require('../../../../shared/data/Stats-config')
const TileConfig = require('../../../../shared/data/Tile-config')

describe('Effect', () => {

    it('basic constructor', () => {
        let effectInfo = {
            stat: StatsConfig.STATS.REPUTATION,
            value: 1,
            condition: { adjacent: [TileConfig.CATEGORIES.INDUSTRIAL, TileConfig.CATEGORIES.COMMERICIAL, TileConfig.CATEGORIES.RESIDENTIAL] }
        }

        let effect = new Effect(effectInfo)
        assert.equal('Effect', effect.type)
        assert.equal(effect.getValue(), 1)
        assert.equal(effect.getStat(), 'reputation')
        assert.equal(effect.getCondition().adjacent.length, 3)
    })

    describe('.isNull', function () {
        it('returns true if there isn\t a valid effect', () => {
          const tile = Tile.findByName('Waterfront Realty')
          const effect = tile.getImmediateEffect()
          assert.isTrue(effect.isNull())
        })
    })

    describe('.executeNewTileEffects', () => {

        it('increments player stats properly for ADJACENT effects ',  () => {
            let users = [1].map( id =>  new User(id))
            let gameState = new GameState(users)
            gameState.setupInitialGameState()

            let player = gameState.getPlayers()[0]
            assert.equal(player.getReputation(), 1)
            assert.equal(player.getIncome(), 0)
            assert.equal(player.getPopulation(), 2)

        })

        it('increments player stats properly for EVERY effects ',  () => {
            let users = [1].map( id =>  new User(id))
            let gameState = new GameState(users)
            gameState.setupInitialGameState()

            let player = gameState.getPlayers()[0]

            let mint = Tile.findByName('Mint')

            player.placeTile(mint, [0,1], gameState)

            assert.equal(player.getReputation(), 0)
            assert.equal(player.getIncome(), 3)
            assert.equal(player.getPopulation(), 2)
            assert.equal(player.getMoney(), 17)
        })

    })
})
