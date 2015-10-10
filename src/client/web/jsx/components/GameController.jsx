'use strict'

//
// GameClient
// Created by aallison on 10/10/15.
//

const React = require('react')
const EchoController = require('./EchoController') // eslint-disable-line no-unused-vars

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
