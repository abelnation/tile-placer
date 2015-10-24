'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')

const TurnActions = require('../actions/TurnActions')
/* eslint-enable no-unused-vars */

export default class PlayerControls extends React.Component {

  constructor(props) {
    super(props)

    this.buyTile = this.buyTile.bind(this)
  }
}
