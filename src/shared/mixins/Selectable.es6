'use strict'

//
// EffectExecution
// Created by dpekar on 10/13/15.
//

const Logger = require('../log/Logger')

const _ = require('underscore')

module.exports = {

  isSelected() {return this.get('selected')},
  setSelected() {this.set('selected', true)},
  setUnselected() {this.set('selected', false)}
}
