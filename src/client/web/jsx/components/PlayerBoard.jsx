'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Placement = require('./Placement')
const Slot = require('./Slot')
const GameStore = require('../stores/GameStore')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class PlayerBoard extends React.Component {

    render() {
      const board = this.props.board
      const placements = board.getPlacements()
      const slots = board.getEmptySlots()

      let divStyle = {position: 'absolute'}

      return (
        <div style={divStyle}>
          {placements.map(this.renderPlacement)}
          {slots.map(this.renderSlot)}
        </div>
      )
    }

    renderPlacement(placement, index) {
      return <Placement placement={placement} key={`${placement.getTile().getName()}_${placement.getCoords()}`} />
    }

    renderSlot(slot, index) {
      return <Slot slot={slot} key={`${slot.getCoords()}`} />
    }
}
