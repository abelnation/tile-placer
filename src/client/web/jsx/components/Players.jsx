'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const Player = require('./Player')

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

export default class Players extends React.Component {

    render() {
      let players = this.props.players
      BrowserLogger.info('Players', players)

      return (
        <div>
          <h2>Players</h2>
          {players.map(this.renderPlayer)}
        </div>
      )
    }

    renderPlayer(player) {
      return (
          <Player key={player.getUser().getUserId()} player={player} />
      );
    }
}
