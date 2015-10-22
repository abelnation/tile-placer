'use strict'

//
// Player
// Created by dpekar on 10/8/15.
//

const BaseModel = require('../BaseModel')

class Slot extends BaseModel {
    constructor(coordinates) {
        super()
        this.set('xCoord', coordinates[0])
        this.set('yCoord', coordinates[1])
        this.set('selected', false)
    }

    getXCoord() { return this.get('xCoord') }
    getYCoord() { return this.get('yCoord') }
    isSelected() {return this.get('selected')}

    setSelected() {this.set('selected', true)}
    setUnselected() {this.set('selected', false)}

    getCoords() {
      return [this.get('xCoord'), this.get('yCoord')]
    }
}

module.exports = Slot
