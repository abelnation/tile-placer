'use strict'

//
// Player
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const _ = require('underscore')

const PlayerBoard = require('./PlayerBoard')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Player extends React.Component {

    render() {
      let player = this.props.player

      let tableStyle = {
        width: '400px'
      }
      return (
        <div>
          <h3>{player.getUser().getName()}</h3>
          <table className='table' style={tableStyle}>
            <tbody>
              {_.map(player.getStats(), this.renderStat)}
            </tbody>
          </table>
          <div className="clearfix"></div>
          <PlayerBoard board={player.getBoard()} />
        </div>
      )
    }

    renderStat(value, stat) {
      return (
        <tr key={stat}>
          <td>{stat}</td>
          <td>{value}</td>
        </tr>
      );
    }
}
