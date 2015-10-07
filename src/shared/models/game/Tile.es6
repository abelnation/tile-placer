'use strict'

//
// Tile
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')

class Tile extends BaseModel {
    constructor(name, cost, category, icon, stage, immediateEffect, conditionalEffect) {
        super()
        this.set('name', name)
        this.set('cost', cost)
        this.set('category', category)
        this.set('icon', icon)
        this.set('stage', stage)
        this.set('immediateEffect', immediateEffect)
        this.set('conditionalEffect', conditionalEffect)
    }

    getName() { return this.get('name') }
    getCost() { return this.get('cost') }
    getCategory() { return this.get('category') }
    getIcon() { return this.get('icon') }
    getStage() { return this.get('stage') }
    getImmediateEffect() { return this.get('immediateEffect') }
    getConditionalEffect() { return this.get('conditionalEffect') }
}
module.exports = Tile