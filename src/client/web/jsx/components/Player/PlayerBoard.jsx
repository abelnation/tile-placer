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
    constructor(props) {
      super(props)

      this.renderPlacement = this.renderPlacement.bind(this)
      this.renderSlot = this.renderSlot.bind(this)
      this.setPlacementSelected = this.setPlacementSelected.bind(this)
      this.setSlotSelected = this.setSlotSelected.bind(this)
    }


    render() {
      const board = this.props.board
      const placements = board.getPlacements()
      const slots = board.getSlots()

      let divStyle = {position: 'absolute'}

      return (
        <div style={divStyle}>
          {placements.map(this.renderPlacement)}
          {slots.map(this.renderSlot)}
        </div>
      )
    }

    renderPlacement(placement, index) {
      return <div onClick={this.setPlacementSelected.bind(this, placement.getCoords())}
                  key={`${placement.getTile().getName()}_${placement.getCoords()}`}>
                  <Placement placement={placement}  />
            </div>
    }

    renderSlot(slot, index) {
      return <div onClick={this.setSlotSelected.bind(this, slot.getCoords())} key={`${slot.getCoords()}`}>
                <Slot slot={slot} />
            </div>
    }

    setSlotSelected(coords) {
      BrowserLogger.info('selectSlot', coords)
      TurnActions.selectSlot({coords})
    }

    setPlacementSelected(coords) {
      BrowserLogger.info('selectPlacement', coords)
      TurnActions.selectPlacement({coords})
    }
}
