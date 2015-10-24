'use strict'

//
// GameClient
// Created by aallison on 10/10/15.
//

/* eslint-disable no-unused-vars */
const React = require('react')
const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

const GameStore = require('../stores/GameStore')
const Markets = require('./Market/Markets')
const Players = require('./Player/Players')
/* eslint-enable no-unused-vars */


module.exports = React.createClass({
    getInitialState() {
      return GameStore.getState()
    },

    getDefaultProps() {
        return {}
    },

    render() {
      const containerStyle={paddingTop: '80px'}
        return (
            <div className='container' style={containerStyle}>
                <div className="clearfix"></div>
                <Markets realEstateTiles={this.state.market.getTiles()} basicTiles={this.state.gameState.getBasicMarketTiles()} />
                <div className="clearfix"></div>
                <Players players={this.state.players} message={this.state.message}/>
                <div className="clearfix"></div>
            </div>
        )
    },

    componentWillMount() {
      GameStore.listen(this.onChange)
    },

    onChange(state) {
      this.setState(state)
    },

    componentWillUnmount() {
      GameStore.unlisten(this.onChange)
    }
})
