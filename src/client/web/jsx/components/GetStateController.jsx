'use strict'

//
// GetStateController
// Created by aallison on 10/10/15.
//

const React = require('react')

const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger

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
                <h3>GetStateController</h3>
                <button onClick={this.getState}>Get State</button>
            </div>
        )
    },

    getState() {
        this.props.client.getStateAsync().then(gameState => {
            this.props.onState(gameState)
        }).catch(err => {
            Logger.error('error fetching state', err)
        })
    }
})
