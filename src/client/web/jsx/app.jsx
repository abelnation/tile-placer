'use strict'

//
// app.jsx
// Created by aallison on 9/30/15.
//

console.log('hello, client!')

const Logger = require('../../../shared/log/BrowserLogger')
const GameClient = require('../../../shared/clients/GameClient')

let client

GameClient.connectBrowserWebSocket('ws://localhost:8002', (err, gameClient) => {
    client = gameClient

    client.echoAsync('hello world').then(result => {
        Logger.info('result', result)
    }).catch(err => {
        Logger.error('error echoing', err)
    })
})

module.exports = {}
