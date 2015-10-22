'use strict'

//
// PlayerBoard
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Slot extends React.Component {

    render() {

      let slotStyle = {
        border: '1px solid black',
        backgroundcolor: '#EAEAEA',
        width: '140px',
        height: '140px',
        float: 'left',
        padding: '8px',
        margin: '8px'
      }

      if(this.props.selected) {
        tileStyle = _.extend(tileStyle, { background: 'gray'})
      }
      return (
        <div style={slotStyle} />
      )
    }
}
