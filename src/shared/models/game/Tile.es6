'use strict'

//
// Tile
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
const TileList = require('../../data/Tile-list')
const TileConfig = require('../../data/Tile-config')
var _ = require('underscore')

class Tile extends BaseModel {
    constructor(tileInfo) {
        super()
        this.setFromObject(tileInfo)        
        // TODO: build in validation for all these fields
    }

    getName() { return this.get('name') }
    getCost() { return this.get('cost') }
    getCategory() { return this.get('category') }
    getIcon() { return this.get('icon') }
    getStage() { return this.get('stage') }
    getImmediateEffect() { return this.get('immediateEffect') }
    getConditionalEffect() { return this.get('conditionalEffect') }

    static allTiles() {
        let result = {}
        _.each(TileList, (tiles, stage) => {
            result[stage] = tiles.map( (tile) => {
                return new Tile(tile)
            })        
        })
        return result
    }

    static basicTiles() {
        const allTiles = Tile.allTiles()        
        return allTiles[TileConfig.BASIC]
    }

}


module.exports = Tile