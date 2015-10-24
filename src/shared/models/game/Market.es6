'use strict'

//
// Market
// Created by dpekar on 10/8/15.
//

// const Logger = require('../../log/Logger')

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


    // Fills up the slots in the market with the top tiles from the earliest tile pile
    fillUpSlots(tilePiles) {
        let tiles = this.getTiles()
        if (tiles.length === 0) { // no tiles on board yet
            for (let i = 0; i < MarketConfig.NUM_SLOTS; i++) {
                let tile = this.selectTopTile(tilePiles)
                tiles.push(tile)
            }
        } else {
            tiles.unshift(this.selectTopTile(tilePiles))
        }
        this.set('tiles', tiles)
    }

    // Takes the top tile from the earliest stack and returns it
    selectTopTile(tilePiles) {
        for (let stage in TileConfig.STAGES) {
            let pile = tilePiles[TileConfig.STAGES[stage]]
            if (pile.length > 0) {
                return pile.shift()
            }
        }
    }

    clearSelectedTiles() {
      this.getTiles().forEach( (tile) => {
        tile.setUnselected()
      })
    }

    getSelectedIndex() {
      let selectedTile = this.getSelectedTile()
      if (_.isEmpty(selectedTile)) {
        return -1
      } else {
        return this.getTiles().indexOf(selectedTile)
      }
    }

    getSelectedTile() {
      return _.find(this.getTiles(), (tile) => {
        return tile.isSelected()
      })
    }

    // Takes the top tile from the earliest stack and returns it
    takeTile(position) {
        let tiles = this.getTiles()
        let selectedTile = tiles.splice(position,1)

        this.set('tiles', tiles)
        return selectedTile
    }

    // Returns the amount extra player must pay for tile based on its position in the market
    markupForPosition(position) {
    if (position > MarketConfig.NUM_SLOTS -1 || position < 0 ) {
            throw new BaseError(`Position ${ position } isn't a valid slot in the market.`)
        }
    return MarketConfig.SLOT_COSTS[position]
    }
}

module.exports = Market
