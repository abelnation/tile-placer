'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')

/* eslint-disable no-unused-vars */
const _ = require('underscore')
/* eslint-enable no-unused-vars */

const MarketConfig = require('../../../../../shared/data/Market-config')


export default class Tile extends React.Component {


  render() {

    let tile = this.props.tile
    const tileSize = 140

    let tileStyle = {
      border: '1px solid black',
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      float: 'left',
      padding: '8px',
      margin: '8px'
    }

    if(tile.isSelected()) {
      tileStyle = _.extend(tileStyle, { background: '#C3C3C3'})
    }

    return (
      <div style={tileStyle}>
        <b>{tile.getName()}</b>
        <br />
        {tile.printImmediateEffect()}
        <br />
        {tile.printConditionalEffects()}
        <br />
        Costs: ${tile.getCost()}
        { this.props.basic ? ' ' : ` + $${MarketConfig.SLOT_COSTS[this.props.index]}` }
      </div>
    )
  }
}
