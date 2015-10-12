'use strict'

//
// Market
// Created by dpekar on 10/8/15.
//

const BaseModel = require('../BaseModel')
const TileConfig = require('../../data/Tile-config')
const MarketConfig = require('../../data/Market-config')

class Market extends BaseModel {
    constructor(tilePiles) {
        super()
        this.set('tiles', [])
        this.fillUpSlots(tilePiles)
    }

    getTiles() { return this.get('tiles') }


    fillUpSlots(tilePiles) {
        let tiles = this.getTiles()
        if (tiles.length === 0) { // no tiles on board yet
            for (let i = 0; i < MarketConfig.NUM_SLOTS; i++) {
                let tile = this.selectTile(tilePiles)
                tiles.push(tile)
            }
        }
        this.set('tiles', tiles)
    }

    selectTile(tilePiles) {
        for (let stage in TileConfig.STAGES) {
            let pile = tilePiles[TileConfig.STAGES[stage]]
            if (pile.length > 0) {
                return pile.shift() 
            }
        }
    }

    markupForPosition(position) {
    if (position > MarketConfig.NUM_SLOTS -1 || position < 0 ) {
            throw new BaseError(`Position ${ position } isn't a valid slot in the market.`)
        }
    return MarketConfig.SLOT_COSTS[position]
    }
}

module.exports = Market