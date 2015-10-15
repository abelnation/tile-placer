'use strict'

//
// Tile
// Created by dpekar on 10/7/15.
//

var _ = require('underscore')
// const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const Effect = require('./Effect')
const TileList = require('../../data/Tile-list')
const TileList2 = require('../../data/Tile-list2')
const TileConfig = require('../../data/Tile-config')

class Tile extends BaseModel {
    constructor(tileInfo) {
        super()
        this.setFromObject(tileInfo)
        this.set('immediateEffect', new Effect(tileInfo.immediateEffect))  
        this.set('conditionalEffects', _.map(tileInfo.conditionalEffects, (conditionalEffect) =>  {
            return new Effect(conditionalEffect)
        }))
        // TODO: build in validation for all these fields
    }

    getName() { return this.get('name') }
    getCost() { return this.get('cost') }
    getCategory() { return this.get('category') }
    getIcon() { return this.get('icon') }
    getStage() { return this.get('stage') }
    getImmediateEffect() { return this.get('immediateEffect') }
    getConditionalEffects() { return this.get('conditionalEffects') }


    meetsCondition(condition) {
        if (_.isUndefined(condition.categories) === false) {
            return this.inAnyOfCategories(condition.categories)
        } else if (_.isUndefined(condition.icon) === false) {
            return this.hasIcon(condition.icon)
        }
    }

    inAnyOfCategories(categories) {
        return _.some(categories, (category) => {
            return this.getCategory() === category
        })
    }

    hasIcon(icon) {
        return this.getIcon() === icon
    }

    static findByName(name) {
        let tileStacks = this.allTiles()
        let allTiles = []
        for (let tileStack in tileStacks) {
            for (let tile of tileStacks[tileStack]) {
                allTiles.push(tile)
            }
        }
        return _.find(allTiles, (tile) => {
            return tile.getName() === name
        })
    }

    static allTiles2() {
        result = {a: [], b: [], c: [], basic: [], lake: []}
        for (let theirTile of TileList2) {
            let number = theirTile.number
            while (number > 0) {
                result[theirTile.stage].push(new Tile(theirTile))
                number--
            }
        }
        return result
    }


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

    static lake() {
        const allTiles = Tile.allTiles()        
        return allTiles[TileConfig.LAKE][0] // Only one tile in the lake stage
    }
}

module.exports = Tile