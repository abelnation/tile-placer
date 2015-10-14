'use strict'

//
// Market-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
const _ = require('underscore')
// const Logger = require('../../../../shared/log/Logger')

const Market = require('../../../../shared/models/game/Market')
const Tile = require('../../../../shared/models/game/Tile')
const TileConfig = require('../../../../shared/data/Tile-config')
const MarketConfig = require('../../../../shared/data/Market-config')

describe('Market', () => {

    it('basic constructor', () => {
        let market = new Market(Tile.allTiles())
        assert.equal('Market', market.type)
        assert.equal(market.getTiles().length, MarketConfig.NUM_SLOTS)
    })

    describe('filling up market with tiles', () => {

        it('.selectTopTile chooses the first tile from a list', () => {
            let market = new Market(Tile.allTiles())
            let allTilesSets = Tile.allTiles()
            let topTile = allTilesSets[TileConfig.STAGES.A][0] 
            let selectedTile = market.selectTopTile(allTilesSets)
            assert.equal(topTile, selectedTile)        
        })

        it('.fillUpSlots takes top tile and preserves order of existing tiles', () => {
            let allTiles = Tile.allTiles()
            let market = new Market(allTiles)
            let previousTiles = Object.assign({}, market.getTiles()) // need to make a copy for check later

            market.takeTile(3)
            market.fillUpSlots(allTiles)
            assert.isFalse(_.contains(previousTiles, market.getTiles()[0]))
        })
    })


    describe('.takeTile', () =>  {
        it('removes the correct tile from the market', () => {
            let market = new Market(Tile.allTiles())
            market.takeTile(3)
            assert.lengthOf(market.getTiles(), MarketConfig.NUM_SLOTS-1)
        })
    })


    describe('.markupForPosition', () =>  {

        it('raises an error if you specify an invalid position in market', () => {
            
        })

        it('charges correct markup according to position on market', () => {
            let market = new Market(Tile.allTiles())

            let marketPosition = 3
            assert.equal(market.markupForPosition(marketPosition), 4)                

            marketPosition = 6
            assert.equal(market.markupForPosition(marketPosition), 0)                        
        })
    })
})
