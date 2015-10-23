'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */


export default class Placement extends React.Component {


  render() {

    const placement = this.props.placement
    const tile = placement.getTile()

    const xCoord = placement.getXCoord() + 3
    const yCoord = placement.getYCoord()

    const yOffset = (xCoord % 2 === 0) ? 70 : 0

    let tileStyle = {
      border: '1px solid black',
      width: '140px',
      height: '140px',
      padding: '8px',
      position: 'absolute',
      top: `${yCoord * 140- yOffset}px`,
      left: `${xCoord * 140}px`
    }

    if(tile.isSelected()) {
      tileStyle = _.extend(tileStyle, { background: 'gray'})
    }
    return (
      <div style={tileStyle}>
        <b>{tile.getName()}</b>
        <br />
        {tile.printImmediateEffect()}
        <br />
        Costs: ${tile.getCost()}
        <br />
          <span className='pull-right'>{this.props.placement.coordsString()}</span>
      </div>
    )
  }
}
