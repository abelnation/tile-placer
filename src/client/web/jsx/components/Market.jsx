'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')
const _ = require('underscore')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Tile = require('./Tile')
const TurnActions = require('../actions/TurnActions')
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Market extends React.Component {
  constructor(props) {
    super(props);

    this.setSelected = this.setSelected.bind(this)
    this.renderTile = this.renderTile.bind(this)
  }
  render() {
    return (
      <div>
        <h2>Real Estate Market</h2>
          {_.map(this.props.tiles, this.renderTile)}
      </div>
    )
  }

  renderTile(tile, index) {
    return <div onClick={this.setSelected.bind(this,index)} key={`${tile.getName()}_${index}`}>
      <Tile tile={tile} />
    </div>
  }

  setSelected(index) {
    BrowserLogger.info('setSelected', index)
    TurnActions.selectTile({index})
  }
}
