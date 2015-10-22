'use strict'

//
//  app.jsx
// Created by dpekar on 9/30/15.
//


const React = require('react')
const ReactDOM = require('react-dom')

const Logger = require('../../../shared/log/BrowserLogger')
const GameController = require('./components/GameController') // eslint-disable-line no-unused-vars

ReactDOM.render(
    <GameController />, document.getElementById('app')
)

module.exports = {}
