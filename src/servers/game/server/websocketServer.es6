'use strict'

//
// websocketServer
// Created by aallison on 10/2/15.
//

const WebSocketServer = require('ws').Server

const WEBSOCKET_PORT = 8002

const opts = {
    port: WEBSOCKET_PORT,
}
const webSocketServer = new WebSocketServer(opts, () => {
        console.log('WebSocket server listening on ' + webSocketServer.options.port)
    })

module.exports = webSocketServer
