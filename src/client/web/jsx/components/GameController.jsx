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

    // componentDidMount() {
    // },
    //
    // componentWillReceiveProps(nextProps) {
    // },
    // shouldComponentUpdate(nextProps, nextState) {
    //     return true
    // },
    // componentWillUpdate(nextProps, nextState) {
    // },
    // componentDidUpdate(prevProps, prevState) {
    // },
    componentWillUnmount() {
      GameStore.unlisten(this.onChange);
    }
})
