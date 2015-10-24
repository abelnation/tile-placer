'use strict'

//
// GameClient
// Created by dpekar on 10/19/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const Player = require('./Player')
/* eslint-enable no-unused-vars */

export default class Players extends React.Component {

    render() {
      let players = this.props.players

      return (
        <div>
          <h2>Players</h2>
          {players.map(this.renderPlayer)}
        </div>
      )
    }

    renderPlayer(player) {
      return (
        <div key={player.getUser().getUserId()}>
          <Player key={player.getUser().getUserId()} player={player} />
          <div className="clearfix"></div>
        </div>
      )
    }
}
