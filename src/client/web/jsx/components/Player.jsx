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
      BrowserLogger.info('Player', this.props.player)

      let player = this.props.player
      return (
        <div>
          <h3>Player {player.getUser().getUserId()}</h3>
          <table>
            <tbody>
              {_.map(player.getStats(), this.renderStat)}
            </tbody>
          </table>

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
