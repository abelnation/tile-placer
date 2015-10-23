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
const PlayerStats = require('./PlayerStats')
const PlayerControls = require('./PlayerControls')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Player extends React.Component {

    render() {
      const player = this.props.player

      return (
        <div>
          <h3>{player.getUser().getName()}</h3>
          <PlayerStats stats={player.getStats()} />
          <PlayerBoard board={player.getBoard()} />
          <PlayerControls player={player} />
        </div>
      )
    }
}
