'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Placement = require('./Placement')
const Slot = require('./Slot')
const GameStore = require('../../stores/GameStore')
const TurnActions = require('../../actions/TurnActions')
/* eslint-enable no-unused-vars */

export default class PlayerBoard extends React.Component {

    render() {
      const board = this.props.board
      const placements = board.getPlacements()
      const slots = board.getSlots()

      this.setSelected = this.setSelected.bind(this)
      this.renderSlot = this.renderSlot.bind(this)

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
      return <div onClick={this.setSelected.bind(this, slot.getCoords())} key={`${slot.getCoords()}`}>
                <Slot slot={slot} />
            </div>
    }

    setSelected(coords) {
      BrowserLogger.info('setSelected', coords)
      TurnActions.selectSlot({coords})
    }
}
