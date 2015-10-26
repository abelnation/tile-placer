'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')
const _ = require('underscore')
/* eslint-enable no-unused-vars */

const TurnActions = require('../../actions/TurnActions')

export default class PlayerControls extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
      return <div>
              <div onClick={this.buyTile} type="button" className="btn btn-default">Buy Tile</div>
              <div onClick={this.investIn} type="button" className="btn btn-default">Invest</div>
            </div>
  }

  buyTile() {
    TurnActions.buyTile()
  }

  investIn() {
    TurnActions.investIn()
  }
}
