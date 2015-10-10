'use strict'

//
// app.jsx
// Created by aallison on 9/30/15.
//

console.log('hello, client!')

const Logger = require('../../../shared/log/BrowserLogger')
const BrowserWebSocketMessageChannel = require('../../../shared/network/channel/BrowserWebSocketMessageChannel')

BrowserWebSocketMessageChannel.connect('ws://localhost:8002', (err, channel) => {
    Logger.info('connected!')
})

module.exports = {}
