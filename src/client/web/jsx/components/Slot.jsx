'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
/* eslint-enable no-unused-vars */

export default class Slot extends React.Component {

    render() {

      const slot = this.props.slot

      const xCoord = slot.getXCoord() + 3
      const yCoord = slot.getYCoord()

      const yOffset = (xCoord % 2 === 0) ? 70 : 0

      let slotStyle = {
        border: '1px solid gray',
        width: '140px',
        height: '140px',
        padding: '8px',
        position: 'absolute',
        top: `${yCoord * 140 - yOffset}px`,
        left: `${xCoord * 140}px`,
        background: '#E6E6E6'
      }

      if(slot.isSelected()) {
        slotStyle = _.extend(slotStyle, { background: '#C3C3C3'})
      }

      return (
        <div style={slotStyle} >
        </div>
      )
    }
}
