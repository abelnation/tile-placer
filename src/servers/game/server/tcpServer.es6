'use strict'

//
// tcpServer
// Created by aallison on 10/2/15.
//

const net = require('net')
const Constants = require('../../../shared/Constants')

const TCP_PORT = Constants.TCP_SERVER_PORT

const tcpServer = net.createServer()

tcpServer.listen(TCP_PORT, () => {
    console.log('Tcp server listening on ' + tcpServer.address().port)
})

module.exports = tcpServer
