'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')

/* eslint-enable no-unused-vars */

export default class PlayerStats extends React.Component {

    render() {
      const stats = this.props.stats

      const tableStyle = {
        width: '400px'
      }
      return (
        <table className='table' style={tableStyle}>
          <tbody>
            {_.map(stats, this.renderStat)}
          </tbody>
        </table>
      )
    }

    renderStat(value, stat) {
      return (
        <tr key={stat}>
          <td>{stat}</td>
          <td>{value}</td>
        </tr>
      )
    }
}
