'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')
const _ = require('underscore')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const MarketConfig = require('../../../../shared/data/Market-config')

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
          {_.map(MarketConfig.SLOT_COSTS, this.renderCost)}
          <div className="clearfix"></div>
          {_.map(this.props.tiles, this.renderTile)}
      </div>
    )
  }

  renderTile(tile, index) {
    return (
      <div>
          <div onClick={this.setSelected.bind(this,index)} key={`${tile.getName()}_${index}`}>
            <Tile tile={tile} />
          </div>
      </div>
    )
  }

  renderCost(cost) {
    const style = {margin: '0px 70px'}
    return <span style={style} className='pull-left'>${cost}</span>
  }

  setSelected(index) {
    BrowserLogger.info('setSelected', index)
    TurnActions.selectTile({index})
  }
}
