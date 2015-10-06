'use strict'

//
// app.es6
// Created by aallison on 9/30/15.
//

const WebSocketGameMessageChannel = require('.././WebSocketMessageChannel')
const TcpMessageChannel = require('.././TcpMessageChannel')
const CommandCenter = require('./CommandCenter')

const websocketServer = require('./server/websocketServer')
websocketServer.on('connection', (webSocket) => {
    let channel = WebSocketGameMessageChannel.fromWebSocket(webSocket)
    CommandCenter.listen(channel)
})

const tcpServer = require('./server/tcpServer')
tcpServer.on('connection', socket => {
    let channel = TcpMessageChannel.fromSocket(socket)
    CommandCenter.listen(channel)
})
