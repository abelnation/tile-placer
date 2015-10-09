'use strict'

//
// Market-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert
// const Logger = require('../../../../shared/log/Logger')

const Market = require('../../../../shared/models/game/Market')
const Tile = require('../../../../shared/models/game/Tile')
const TileConfig = require('../../../../shared/data/Tile-config')

describe('Market', () => {
    const allTiles = Tile.allTiles()
    let market = new Market(allTiles)

    it('basic constructor', () => {
        assert.equal('Market', market.type)
        assert.equal(market.getTiles().length, Market.NUM_SLOTS)
    })

    it('choose the first tile from a list', () => {
        let allTilesSet2 = Tile.allTiles()
        let topTile = allTilesSet2[TileConfig.STAGES.A][0] 
        let selectedTile = market.selectTile(allTilesSet2)
        assert.equal(topTile, selectedTile)        
    })
})
