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
    constructor(props) {
      super(props)

      this.renderPlayer = this.renderPlayer.bind(this)
    }

    render() {
      const players = this.props.players

      return (
        <div>
          {players.map(this.renderPlayer)}
        </div>
      )
    }

    renderPlayer(player) {
      const message = this.props.message

      return (
        <div key={player.getUser().getUserId()}>
          <Player key={player.getUser().getUserId()} player={player} message={message}/>
          <div className="clearfix"></div>
        </div>
      )
    }
}
