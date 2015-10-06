'use strict'

//
// websocketServer
// Created by aallison on 10/2/15.
//

const WebSocketServer = require('ws').Server
const Constants = require('../../../shared/Constants')

const WEBSOCKET_PORT = Constants.WEBSOCKET_SERVER_PORT

const opts = {
    port: WEBSOCKET_PORT,
}
const webSocketServer = new WebSocketServer(opts, () => {
    console.log('WebSocket server listening on ' + webSocketServer.options.port)
})

module.exports = webSocketServer
