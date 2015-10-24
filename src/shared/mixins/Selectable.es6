'use strict'

//
// EffectExecution
// Created by dpekar on 10/13/15.
//

/* eslint-disable no-unused-vars */
const Logger = require('../log/Logger')
const _ = require('underscore')
/* eslint-enable no-unused-vars */

module.exports = {

  isSelected() {return this.get('selected')},
  setSelected() {this.set('selected', true)},
  setUnselected() {this.set('selected', false)},

}
