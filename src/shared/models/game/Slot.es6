'use strict'

//
// Player
// Created by dpekar on 10/8/15.
//
const _ = require('underscore')

const BaseModel = require('../BaseModel')
const Selectable = require('../../mixins/Selectable')
const Coordinated = require('../../mixins/Coordinated')

class Slot extends BaseModel {
    constructor(coordinates) {
        super()
        this.set('xCoord', coordinates[0])
        this.set('yCoord', coordinates[1])
        this.set('selected', false)
    }
}
_.extend(Slot.prototype, Selectable)
_.extend(Slot.prototype, Coordinated)

module.exports = Slot
