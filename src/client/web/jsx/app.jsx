'use strict'

//
// app.jsx
// Created by aallison on 9/30/15.
//

const ReactDOM = require('react-dom')

const Logger = require('../../../shared/log/BrowserLogger')
const GameClient = require('../../../shared/clients/GameClient')
const GameController = require('./components/GameController') // eslint-disable-line no-unused-vars

let client

GameClient.connectBrowserWebSocket('ws://localhost:8002', (err, gameClient) => {
    client = gameClient

    ReactDOM.render(
        <GameController client = {client} />,
        document.getElementById('app')
    )

    client.echoAsync('hello world').then(result => {
        Logger.info('result', result)
    }).catch(err => {
        Logger.error('error echoing', err)
    })
})

module.exports = {}
