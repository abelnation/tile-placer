'use strict'

//
// Tile-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Tile = require('../../../../shared/models/game/Tile')
const TileConfig = require('../../../../shared/data/Tile-config')

describe('Tile', () => {
    const BASIC_TILE_NAMES = ['Suburbs', 'Community Park', 'Heavy Factory']

    it('basic constructor', () => {
        let tileInfo = {
            name: 'Convenience Store',
            cost: 6,
            category: 'Commericial',
            icon: null,
            stage: 'a',
            immediateEffect: (player) => { player.income++},
            conditionalEffect: (player) => { }
        }

        let tile = new Tile(tileInfo)
        assert.equal('Tile', tile.type)
        assert.equal(tile.getName(), 'Convenience Store')
        assert.equal(tile.getCost(), 6)
        assert.equal(tile.getCategory(), 'Commericial')
        assert.equal(tile.getIcon(), null)
        assert.equal(tile.getStage(), 'a')
    })

    describe('grabbing tiles for setup:', () => {
        it('.allTiles returns an object containing tiles for all game stages', () => {        
            const allTiles = Tile.allTiles()
            const stagesFromTiles = Object.keys(allTiles)
            const stageKeysFromConst = Object.keys(TileConfig.STAGES)
            const stageValuesFromConst = stageKeysFromConst.map((key) => { return TileConfig.STAGES[key] })
            stageValuesFromConst.push(TileConfig.BASIC)
            stageValuesFromConst.push(TileConfig.LAKE)

            // Check the set of stages are as expected without depending on order returned by .allTiles
            assert.equal(stagesFromTiles.length, stageValuesFromConst.length)
            for (let tileKey of stagesFromTiles) {
                assert.include(stageValuesFromConst, tileKey)
            }
        })

        it('.allTiles returns only tile objects', () => {        
            const allTiles = Tile.allTiles()
            for (let stage in allTiles) {
                for (let tile of allTiles[stage]) {
                    assert.equal(tile.type, 'Tile')
                }
            }
        })

        it('.basicTiles return an array of the 3 basic tiles', () => {
            const basicTiles = Tile.basicTiles()
            assert.equal(basicTiles.length, 3)
            for (let tile of basicTiles) {
                assert.include(BASIC_TILE_NAMES, tile.getName())
            }
        })

    })
})