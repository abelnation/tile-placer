'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Tile = require('./Tile')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Market extends React.Component {

    render() {
      return (
        <div>
          <h2>Real Estate Market</h2>
          {this.props.tiles.map(this.renderTile)}
        </div>
      )
    }

    renderTile(tile) {
      return <Tile key={tile.getName() + Math.random()} tile={tile}/>
    }
}
