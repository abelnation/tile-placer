'use strict'

//
// Market-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Market = require('../../../../shared/models/game/Market')
const Tile = require('../../../../shared/models/game/Tile')
// const Logger = require('../../../../shared/log/Logger')

describe('Market', () => {
    const allTiles = Tile.allTiles()
    let market = new Market(allTiles)

    it('basic constructor', () => {
        assert.equal('Market', market.type)
        assert.equal(market.getTiles().length, Market.SLOTS)
    })

    it('choose the first tile from a list', () => {
        let allTilesSet2 = Tile.allTiles()
        let topTile = allTilesSet2[Tile.STAGES.A][0] 
        let selectedTile = market.selectTile(allTilesSet2)
        assert.equal(topTile, selectedTile)        
    })
})
