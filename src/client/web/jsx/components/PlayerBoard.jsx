'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger


const Tile = require('./Tile')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class PlayerBoard extends React.Component {

    render() {
      BrowserLogger.info('Board', this.props.board)

      let board = this.props.board
      let placements = board.getPlacements()
      let tiles = placements.map(function(placement) {
        return placement.getTile()
      })

      return (
        <div>
          {tiles.map(this.renderTile)}
        </div>
      )
    }

    renderTile(tile) {

      return <Tile tile={tile} key={Math.random()}></Tile>
    }
}
