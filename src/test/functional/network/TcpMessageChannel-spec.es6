'use strict'

/*eslint-disable no-unused-vars */
//
// TcpMessageChannel-spec
// Created by aallison on 10/5/15.
//

const net = require('net')
const assert = require('chai').assert

const Logger = require('../../../shared/log/Logger')
const Constants = require('../../../shared/Constants')

const MessageChannel = require('../../../shared/network/channel/MessageChannel')
const TcpMessageChannel = require('../../../shared/network/channel/TcpMessageChannel')

const NetworkMessage = require('../../../shared/models/network/channel/NetworkMessage')

describe('TcpMessageChannel', () => {

    let tcpServer

    beforeEach((done) => {
        tcpServer = net.createServer()
        tcpServer.listen(Constants.TCP_SERVER_PORT, () => {
            Logger.debug('SERVER: tcp server listening on ' + tcpServer.address().port)
            done()
        })
    })

    afterEach((done) => {
        tcpServer.close(() => {
            done()
        })
    })

    it('simple connect', (done) => {

        tcpServer.on('connection', socket => {
            let channel = TcpMessageChannel.fromSocket(socket)
            channel.on('data', (data) => {
                Logger.info(`SERVER: onData: ${ JSON.stringify(data) }`)
                channel.send(data)
            })
            channel.on('close', () => {
                Logger.info(`SERVER: onClose`)
            })
        })

        Logger.info('CLIENT: connecting to tcp server...')
        TcpMessageChannel.connect('localhost', Constants.TCP_SERVER_PORT, (err, channel) => {
            if (err) {
                Logger.debug('CLIENT: connection error')
                return done(err)
            }
            Logger.debug('CLIENT: connected!')

            Logger.debug('CLIENT: closing client connection...')
            channel.close()
            setTimeout(() => { done() }, 200)
        })
    })

    it('simple echo', (done) => {

        const EXPECTED = 'test'

        tcpServer.on('connection', socket => {
            let channel = TcpMessageChannel.fromSocket(socket)
            Logger.debug(`client connected: ${ channel.remoteId } => ${ channel.localId }`)

            channel.on(MessageChannel.EVENT_NETWORK_MESSAGE, content => {
                // echo
                Logger.info(`SERVER: received msg: ${ content }`)
                channel.send(content)
            })
        })

        TcpMessageChannel.connect('localhost', Constants.TCP_SERVER_PORT, (err, channel) => {
            if (err) {
                Logger.debug('connection error')
                return done(err)
            }

            channel.on(MessageChannel.EVENT_NETWORK_MESSAGE, content => {

                Logger.debug('received content!')
                Logger.debug(JSON.stringify(content))

                assert.equal(EXPECTED, content)
                Logger.debug('closing client connection...')
                channel.close()
                setTimeout(() => { done() }, 200)
            })

            channel.on(MessageChannel.EVENT_NETWORK_ERROR, err => {
                Logger.debug('closing client connection...')
                channel.close()
                setTimeout(() => { done(err) }, 200)
            })

            Logger.info(`CLIENT: sending content: ${ EXPECTED }`)
            channel.send(EXPECTED)
        })

    })
})
