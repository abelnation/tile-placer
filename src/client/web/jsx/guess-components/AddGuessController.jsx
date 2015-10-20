'use strict'

//
// AddGuessController
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
        return {
            onStateChange: () => {}
        }
    },

    render() {
        let error
        if (this.state.error) {
            Logger.info('error exists', this.state.error)
            error = <div>Error: {this.state.error.getMessage()}</div>
        }

        return (
            <div>
                <h3>AddGuessController</h3>
                <div>
                    <input type="text" ref="textInput" />
                    <button onClick={this.onAddGuess}>Guess</button>
                </div>
                {error}
            </div>
        )
    },

    onAddGuess() {
        const inputValue = parseInt(this.refs.textInput.getDOMNode().value, 10)
        this.props.client.addGuessAsync(inputValue).then(gameState => {
            this.setState({
                error: null
            }, () => {
                this.props.onStateChange(gameState)
            })
        }).catch(err => {
            Logger.error('AddGuess error', err)
            this.setState({
                error: err
            })
        })
    }
})
