'use strict'

//
// Player
// Created by dpekar on 10/8/15.
//

const BaseModel = require('../BaseModel')

class Placement extends BaseModel {
    constructor(tile, coordinates, turn) {
        super()
        this.set('tile', tile)

        this.set('xCoord', coordinates[0])
        this.set('yCoord', coordinates[1])
        this.set('turn', turn)
    }

    getXCoord() { return this.get('xCoord')}
    getYCoord() { return this.get('yCoord')}

    getCoords() {
      return [this.get('xCoord'), this.get('yCoord')]
    }

}
module.exports = Placement