'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')

/* eslint-enable no-unused-vars */

export default class PlayerStats extends React.Component {

    render() {
      const stats = this.props.stats

      return (
        <div className='row'>
            {_.map(stats, this.renderStat)}
        </div>
      )
    }

    renderStat(value, stat) {
      return (
        <div className='col-md-2' key={stat}>
          <h3>{stat}: {value}</h3>
        </div>
      )
    }
}
