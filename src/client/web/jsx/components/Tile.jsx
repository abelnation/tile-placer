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
      tileStyle = _.extend(tileStyle, { background: 'gray'})
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
      </div>
    )
  }
}
