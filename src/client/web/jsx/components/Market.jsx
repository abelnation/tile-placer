'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')
const _ = require('underscore')
const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const Tile = require('./Tile')
/* eslint-enable no-unused-vars */

const MarketConfig = require('../../../../shared/data/Market-config')

const TurnActions = require('../actions/TurnActions')

export default class Market extends React.Component {
  constructor(props) {
    super(props)

    // this.buyTile = this.buyTile.bind(this)

    this.setSelected = this.setSelected.bind(this)
    this.renderTile = this.renderTile.bind(this)
  }

  render() {
    return (
      <div>
        <div onClick={this.buyTile} type="button" className="btn btn-primary pull-right">Buy Tile</div>
        <h2>Real Estate Market</h2>
          {_.map(this.props.tiles, this.renderTile)}
          <div className="clearfix"></div>
          {_.map(MarketConfig.SLOT_COSTS, this.renderCost)}
          <div className="clearfix"></div>
      </div>
    )
  }

  renderTile(tile, index) {
    return (
      <div key={`${tile.getName()}_${index}`}>
          <div onClick={this.setSelected.bind(this,index)}>
            <Tile tile={tile} />
          </div>
      </div>
    )
  }

  buyTile() {
    TurnActions.buyTile()
  }

  renderCost(cost, index) {
    const style = {margin: '0px 70px', fontweight: 'bold'}
    return <span style={style} key={index} className='pull-left'>+${cost}</span>
  }

  setSelected(index) {
    BrowserLogger.info('setSelected', index)
    TurnActions.selectTile({index})
  }
}
