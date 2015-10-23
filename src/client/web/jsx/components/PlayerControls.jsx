'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')

const TurnActions = require('../actions/TurnActions')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class PlayerControls extends React.Component {

  constructor(props) {
    super(props);

    this.buyTile = this.buyTile.bind(this)
  }

    render() {
      const player = this.props.player

      return <div onClick={this.buyTile} type="button" className="btn btn-primary">Buy Tile</div>
    }

    buyTile() {
      TurnActions.buyTile()
    }
}
