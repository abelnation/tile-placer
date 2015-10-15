'use strict'

//
// GameClient
// Created by aallison on 10/10/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

/* eslint-disable no-unused-vars */
const EchoController = require('./EchoController')
const AddGuessController = require('./AddGuessController')
const GetStateController = require('./GetStateController')
const GameStateViewer = require('./GameStateViewer')
/* eslint-enable no-unused-vars */

module.exports = React.createClass({
    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    render() {
        return (
            <div>
                <h1>GameController</h1>
                <EchoController client = { this.props.client } />
                <AddGuessController client = { this.props.client }
                    onStateChange={this.onStateChange} />
                <GetStateController client = { this.props.client }
                    onState={this.onStateChange} />
                <GameStateViewer gameState={this.state.gameState} />
            </div>
        )
    },

    onStateChange(newGameState) {
        Logger.trace('GameController.onStateChange')
        this.setState({
            gameState: newGameState
        })
    },

    componentWillMount() {
    },
    componentDidMount() {
        this.props.client.getStateAsync().then(gameState => {
            this.onStateChange(gameState)
        }).catch(err => {
            Logger.error('error fetching gameState', err)
        })
    },
    componentWillReceiveProps(nextProps) {
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true
    },
    componentWillUpdate(nextProps, nextState) {
    },
    componentDidUpdate(prevProps, prevState) {
    },
    componentWillUnmount() {
    }
})
