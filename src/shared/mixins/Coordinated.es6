'use strict'

//
// Coordinated
// Created by dpekar on 10/22/15.
//

module.exports = {
  getXCoord() { return this.get('xCoord') },
  getYCoord() { return this.get('yCoord') },

  getCoords() {
    return [this.get('xCoord'), this.get('yCoord')]
  },

  coordsString() {
    return `${this.getXCoord()}, ${this.getYCoord()}`
  }
}
