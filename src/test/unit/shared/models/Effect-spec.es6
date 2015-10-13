'use strict'

//
// effect-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
// const Logger = require('../../../../shared/log/Logger')

const User = require('../../../../shared/models/User')
const GameState = require('../../../../shared/models/game/GameState')
const Player = require('../../../../shared/models/game/Player')
const Tile = require('../../../../shared/models/game/Tile')
const Effect = require('../../../../shared/models/game/Effect')
const StatsConfig = require('../../../../shared/data/Stats-config')
const TileConfig = require('../../../../shared/data/Tile-config')

describe('Effect', () => {
    let player = new Player()

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

    describe('.executeOn', () => {

        it('increments player stats properly for adjacent effects ',  () => {
            let users = [1,2,3].map( id =>  new User(id))
            let gameState = new GameState(users)
            const basicTiles = Tile.basicTiles()
            let suburbs = basicTiles[0] // Suburbs 
            let suburbsPlacement = player.placeTile(suburbs, [0,0], 1)
            assert.equal(player.getReputation(), 0)

            player.executeImmediateEffect(suburbsPlacement)
            player.executeConditionalEffects(suburbsPlacement)

            let communityPark = basicTiles[1] // Community Park
            let communityPlacement = player.placeTile(communityPark, [0,1], 1)

            player.executeImmediateEffect(communityPlacement)
            player.executeConditionalEffects(communityPlacement, gameState)

            assert.equal(player.getIncome(), -1)
            assert.equal(player.getPopulation(), 3)
            assert.equal(player.getReputation(), 1)
        })
      
    })


})