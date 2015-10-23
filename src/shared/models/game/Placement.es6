'use strict'

//
// Player
// Created by dpekar on 10/8/15.
//
const _ = require('underscore')

const BaseModel = require('../BaseModel')
const Coordinated = require('../../mixins/Coordinated')

class Placement extends BaseModel {
    constructor(tile, coordinates, turnNum) {
        super()
        this.set('tile', tile)

        this.set('xCoord', coordinates[0])
        this.set('yCoord', coordinates[1])

        this.set('investedIn', false)
        this.set('turnNum', turnNum)
    }

    getTile() { return this.get('tile') }
    alreadyInvestedIn() { return this.get('investedIn') }

    makeInvestment() {
        this.set('investedIn', true)
    }
}

_.extend(Placement.prototype, Coordinated)

module.exports = Placement
