'use strict'

//
// Effect
// Created by dpekar on 10/14/15.
//

const _ = require('underscore')
const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
// const TileConfig = require('../../data/Tile-config')

class EffectResult extends BaseModel {

    constructor(placement, stat, value) {
        super()
        this.set('placement', placement)        
        this.set('stat', stat)        
        this.set('value', value)        
    }

    getSummary() { return `${this.getPlacement().getTile().getName()} produced ${this.getValue()} ${this.getStat()}` }

}

module.exports = EffectResult