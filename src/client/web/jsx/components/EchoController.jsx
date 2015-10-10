'use strict'

//
// EchoController
// Created by aallison on 10/10/15.
//

const React = require('react')

module.exports = React.createClass({
    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    render() {
        let lastResult
        if (this.state.error) {
            lastResult = <div>Error: { error.message }</div>
        } else if (this.state.lastResult) {
            lastResult = <div>{ JSON.stringify(this.state.lastResult) }</div>
        } else {
            lastResult = <div>no last result</div>
        }

        return (
            <div>
                Echo Controller
                <input type="text" ref="textInput" />
                <button onClick={this.onEcho}>Echo</button>
                {lastResult}
            </div>
        )
    },

    onEcho() {
        const inputValue = this.refs.textInput.getDOMNode().value
        this.props.client.echoAsync(inputValue).then(result => {
            this.setState({
                lastResult: result
            })
        }).catch(err => {
            this.setState({
                error: err
            })
        })
    }
})
