'use strict'

//
// Tile
// Created by dpekar on 10/7/15.
//

var _ = require('underscore')
// const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const Selectable = require('../../mixins/Selectable')

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
        this.set('selected', false)
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

    printImmediateEffect() {
      let immediateEffect = this.getImmediateEffect()

      if (immediateEffect.isNull()) {
        return ''
      } else {
        return `+${immediateEffect.getValue()} ${immediateEffect.getStat()}`
      }
    }

    printConditionalEffect(effect) {
      let condition = effect.getCondition()
      if(_.isObject(condition)) {
        if (_.isArray(condition.categories)) {
          return `+${effect.getValue()} ${effect.getStat()} per ${condition.type} per ${condition.categories.toString()}`
        } else {
          return `+${effect.getValue()} ${effect.getStat()} per ${condition.type} per ${condition.icon}`
        }
      }
    }

    printConditionalEffects() {
      let conditionalEffects = this.getConditionalEffects()
      if (_.isEmpty(conditionalEffects)) {
        return ''
      } else {
        let output = []
        conditionalEffects.forEach((effect) => {
          output.push(this.printConditionalEffect(effect))
        })
        return output.toString()
      }
    }

    areNoConditionalEffects() {
      return _.isEmpty(this.getConditionalEffects())
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

    static clone(tile) {
      let info = {
        immediateEffect: tile.getImmediateEffect().data,
        conditionalEffects: tile.getConditionalEffects().map( (effect) => {
          return effect.data
        }),
        name: tile.getName(),
        cost: tile.getCost(),
        category: tile.getCategory(),
        stage: tile.getStage(),
        icon: tile.getIcon()
      }

      let clone = new Tile(info)
      return clone
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

    static newLake() {
        return Tile.clone(Tile.lake())
    }

    static lake() {
        const allTiles = Tile.allTiles()
        return allTiles[TileConfig.LAKE][0] // Only one tile in the lake stage
    }
}
_.extend(Tile.prototype, Selectable)

module.exports = Tile
