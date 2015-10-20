'use strict'

//
// GameStateViewer
// Created by aallison on 10/10/15.
//

const _ = require('underscore')
const React = require('react')
const BrowserLogger = require('../../../../shared/log/BrowserLogger')
const Logger = BrowserLogger
const ModelManager = require('../../../../shared/models/ModelManager')

module.exports = React.createClass({
    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    render() {

        const gameState = this.props.gameState
        if (!gameState) {
            return <div>loading...</div>
        }

        Logger.info('gameState', gameState)

        let guesses = []
        _.each(gameState.getPastGuesses(), (guess, key) => {
            guess = ModelManager.fromJSON(guess)
            Logger.info('processing guess', guess)
            guesses.push(<tr key={guess.getGuess()}>
                <td>{ guess.getGuess() }</td>
                <td>{ guess.getPlayer().getUserId() }</td>
            </tr>)
        })

        return (
            <div>
                <h3>GameStateViewer</h3>
                <div>
                    <p>Last guess: { gameState.getCurrentGuess().getGuess() }</p>
                    <p>Past guesses:</p>
                    <table>
                        <tr>
                            <td>Guess</td>
                            <td>User</td>
                        </tr>
                        {guesses}
                    </table>
                </div>
            </div>
        )
    },

    componentWillMount() {
    },
    componentDidMount() {
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
