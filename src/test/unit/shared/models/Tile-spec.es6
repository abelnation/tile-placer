'use strict'

//
// Tile-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Tile = require('../../../../shared/models/game/Tile')
const TileConfig = require('../../../../shared/data/Tile-config')
const StatsConfig = require('../../../../shared/data/Stats-config')

describe('Tile', () => {
    const BASIC_TILE_NAMES = ['Suburbs', 'Community Park', 'Heavy Factory']

    it('basic constructor', () => {
        let tileInfo = {
            name: 'Convenience Store',
            cost: 6,
            category: 'Commericial',
            icon: null,
            stage: 'a',
            immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
            conditionalEffects: [{stat: StatsConfig.STATS.REPUTATION, value: 1, condition:
                            { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.COMMERICIAL] }
            }]
        }

        let tile = new Tile(tileInfo)
        assert.equal('Tile', tile.type)
        assert.equal(tile.getName(), 'Convenience Store')
        assert.equal(tile.getCost(), 6)
        assert.equal(tile.getCategory(), 'Commericial')
        assert.equal(tile.getIcon(), null)
        assert.equal(tile.getStage(), 'a')
        assert.equal(tile.getImmediateEffect().type, 'Effect')
        assert.equal(tile.getConditionalEffects().length, 1)
        assert.isFalse(tile.isSelected())
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

        it('.lake returns a lake', () => {
            const lake = Tile.lake()
            assert.equal(lake.getName(), 'Lake')
        })

    })

    describe("selection in UI", function () {
        it(".setSelected sets the tile to true", function () {
          let tile = Tile.basicTiles()[0]
          tile.setSelected()
          assert.isTrue(tile.isSelected())
        })

        it(".setUnselected sets the tile to false", function () {
          let tile = Tile.basicTiles()[0]
          tile.setSelected()
          assert.isTrue(tile.isSelected())
          tile.setUnselected()
          assert.isFalse(tile.isSelected())
        })

    })

    describe(".printImmediateEffect", function () {
        it('prints a tiles effect properly', function () {
          const suburbs = Tile.findByName('Suburbs')

          assert.equal(suburbs.printImmediateEffect(), '+2 population')
        })

        it("prints empty string if there's no immediate effect", function () {
          const mobHome = Tile.findByName('Waterfront Realty')
          assert.equal(mobHome.printImmediateEffect(), '')
        });
    })

    describe('executing effects', () => {

        describe('.meetsCondition', () => {
            const basicTiles = Tile.basicTiles()
            let tile = basicTiles[0] // Suburbs

            it('returns true if the condition is met by the tile', () => {
                let condition = { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.INDUSTRIAL, TileConfig.CATEGORIES.COMMERICIAL, TileConfig.CATEGORIES.RESIDENTIAL] }
                assert.isTrue(tile.meetsCondition(condition))
            })

            it('returns false if the condition isn\'t met by the tile', () => {
                let condition = { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.INDUSTRIAL] }
                assert.isFalse(tile.meetsCondition(condition))
            })
        })

        describe('.hasIcon', () => {
            const basicTiles = Tile.basicTiles()
            let tile = basicTiles[0] // Suburbs

            it('.hasIcon returns false if tile has no icon associated with it', () => {
                assert.isFalse(tile.hasIcon())
            })

            it('.hasIcon returns true if the tile has an icon associated with it', () => {
                tile.set('icon', TileConfig.ICONS.SCHOOL)
                assert.isTrue(tile.hasIcon(TileConfig.ICONS.SCHOOL))
            })

            it('.hasIcon returns true if the tile has an different icon associated with it', () => {
                assert.isFalse(tile.hasIcon(TileConfig.ICONS.RESTAURANT))
            })

        })

        describe('.hasCategory', () => {
            const basicTiles = Tile.basicTiles()
            let tile = basicTiles[0] // Suburbs

            it('.hasIcon returns false if wrong category', () => {
                assert.isFalse(tile.inAnyOfCategories([TileConfig.CATEGORIES.COMMERCIAL,  TileConfig.CATEGORIES.MUNICIPLE]))
            })

            it('.hasIcon returns true if the tile is one of the categories', () => {
                assert.isTrue(tile.inAnyOfCategories([TileConfig.CATEGORIES.RESIDENTIAL,  TileConfig.CATEGORIES.MUNICIPLE]))
            })

        })

        describe('.areNoConditionalEffects', () => {
          const basicTiles = Tile.basicTiles()
          let tile = basicTiles[0] // Suburbs

          it('returns true if the tile has no conditional effects', function () {
            assert.isTrue(tile.areNoConditionalEffects())
          })
        })

        describe('.clone', function () {
          const commPark = Tile.findByName('Community Park')

          it("create a tile containing the tile stats passed in", function () {
            let commParkClone = Tile.clone(commPark)
            assert.equal(commParkClone.getName(), 'Community Park')
            assert.isFalse(commParkClone.getImmediateEffect().isNull())
          })
        })

    })

})
