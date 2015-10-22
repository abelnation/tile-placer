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

    let tileStyle = {
      border: '1px solid black',
      width: '140px',
      height: '140px',
      float: 'left',
      padding: '8px',
      margin: '8px'
    }

    if(this.props.tile.isSelected()) {
      tileStyle = _.extend(tileStyle, { background: 'gray'})
    }
    return (
      <div style={tileStyle}>
        <b>{this.props.tile.getName()}</b>
        <br />
        {this.props.tile.printImmediateEffect()}
        <br />
        Costs: ${this.props.tile.getCost()}
      </div>
    )
  }
}
