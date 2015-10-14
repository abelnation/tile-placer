'use strict'

//
// Player
// Created by dpekar on 10/8/15.
//

const BaseModel = require('../BaseModel')

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
    getXCoord() { return this.get('xCoord') }
    getYCoord() { return this.get('yCoord') }
    getInvestedIn() { return this.get('investedIn') }

    getCoords() {
      return [this.get('xCoord'), this.get('yCoord')]
    }

    makeInvestment() {
        this.set('investedIn', true)
    }
}

module.exports = Placement