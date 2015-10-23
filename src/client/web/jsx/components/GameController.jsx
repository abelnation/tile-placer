'use strict'

//
// GameClient
// Created by aallison on 10/10/15.
//

const React = require('react')
const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const Market = require('./Market')
const Players = require('./Players')
const GameStore = require('../stores/GameStore')
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

module.exports = React.createClass({
    getInitialState() {
      return GameStore.getState()
    },

    getDefaultProps() {
        return {}
    },

    render() {
        return (
            <div>
                <div className="alert alert-info" role="alert">{this.state.message}</div>
                {this.state.currentPlayer.getName()}
                <br />
                {this.state.gameState.getTurnNum()}
                <div className="clearfix"></div>
                <Market tiles={this.state.market.getTiles()} />
                <div className="clearfix"></div>
                <Players players={this.state.players} />
                <div className="clearfix"></div>
            </div>
        )
    },

    componentWillMount() {
      GameStore.listen(this.onChange);
    },

    onChange(state) {
      this.setState(state);
    },

    componentWillUnmount() {
      GameStore.unlisten(this.onChange);
    }
})
