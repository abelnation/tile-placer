'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Tile = require('./Tile')
const Slot = require('./Slot')
const GameStore = require('../stores/GameStore')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class PlayerBoard extends React.Component {

    render() {
      let board = this.props.board
      let placements = board.getPlacements()
      let tiles = placements.map(function(placement) {
        return placement.getTile()
      })

      return (
        <div>
          {tiles.map(this.renderTile)}
          <Slot index={[1,1]} selected={true}></Slot>
        </div>
      )
    }

    renderTile(tile, index) {
      return <Tile tile={tile} key={Math.random()}></Tile>
    }
}
