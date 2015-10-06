'use strict'

/*eslint-disable no-unused-vars */
//
// LiveClient-spec
// Created by aallison on 10/5/15.
//

const net = require('net')
const assert = require('chai').assert
const assertJsonEqual = require('../../util/json').assertJsonEqual

const Logger = require('../../../shared/log/Logger')
const Constants = require('../../../shared/Constants')

const LiveClient = require('../../../shared/network/liveclient/LiveClient')

const BaseError = require('../../../shared/models/error/BaseError')
const User = require('../../../shared/models/User')
const PingCommand = require('../../../shared/models/commands/PingCommand')
const AckResponse = require('../../../shared/models/network/liveclient/AckResponse')

describe('LiveClient Functional Test', () => {

    let tcpServer
    let user = new User.newUser()

    beforeEach(done => {
        tcpServer = net.createServer()
        tcpServer.listen(Constants.TCP_SERVER_PORT, () => {
            Logger.debug('SERVER: tcp server listening on ' + tcpServer.address().port)
            done()
        })
    })

    afterEach(done => {
        tcpServer.close(() => {
            done()
        })
    })


    it('simple request/response', (done) => {

        tcpServer.on('connection', socket => {
            console.log('tcp server received connection')
            let client = LiveClient.fromSocket(socket)
            client.handle((req, res) => {
                const cmd = req.getContent()
                if (cmd instanceof PingCommand) {
                    cmd.executeAsync({}).then(result => {
                        res.ok(result)
                    }).catch(err => {
                        res.error(err)
                    })
                } else {
                    throw new Error('cmd not instance of PingCommand')
                }
            })
        })

        console.log('Connecting to TCP server')
        LiveClient.connect('localhost', Constants.TCP_SERVER_PORT, (err, client) => {
            if (err) {
                return done(err)
            }

            client.requestAsync(new PingCommand()).then(response => {
                console.log('received response')
                console.log(response)

                assertJsonEqual({ ping: true }, response)
                client.close()
                done()
            }).catch(err => {
                done(err)
            })
        })
    })

    it('simple bi-directional request/response', (done) => {

        let clientLiveClient = null
        let serverLiveClient = null

        let clientAck = false
        let serverAck = false

        // Setup our server
        // It is a simple ack server, which just acks any command it receives
        tcpServer.on('connection', socket => {
            console.log('tcp server received connection')
            serverLiveClient = LiveClient.fromSocket(socket)

            serverLiveClient.handle((req, res) => {
                assert(req.getContent() instanceof PingCommand)
                res.ack()
            })

            // make request from server later
            setTimeout(() => {
                serverLiveClient.requestAsync(new PingCommand()).then(response => {
                    Logger.debug(`SERVER: got liveclient response: ${ response }`)
                    assert.equal(Constants.ACK, response)
                    serverAck = true
                    if (clientAck && serverAck) {
                        clientLiveClient.close()
                        serverLiveClient.close()
                        done()
                    }
                }).catch(err => {
                    done(err)
                })
            }, 500)
        })

        // Connect to our server with a client
        console.log('Connecting to TCP server')
        LiveClient.connect('localhost', Constants.TCP_SERVER_PORT, (err, liveClient) => {
            if (err) {
                return done(err)
            }

            clientLiveClient = liveClient

            clientLiveClient.handle((req, res) => {
                assert(req.getContent() instanceof PingCommand)
                res.ack()
            })

            clientLiveClient.requestAsync(new PingCommand()).then(response => {
                Logger.debug(`CLIENT: got liveclient response: ${ response }`)
                assert.equal(Constants.ACK, response)
                clientAck = true
            }).catch(err => {
                done(err)
            })
        })
    })

    it('simple error response', (done) => {

        const ERROR_MSG = 'test error'

        // Setup our server
        // It is a simple ack server, which just acks any command it receives
        tcpServer.on('connection', socket => {
            console.log('tcp server received connection')
            const client = LiveClient.fromSocket(socket)

            client.handle((req, res) => {
                res.error(new BaseError(ERROR_MSG))
            })
        })

        // Connect to our server with a client
        Logger.info('Connecting to TCP server')
        LiveClient.connect('localhost', Constants.TCP_SERVER_PORT, (err, liveClient) => {
            if (err) {
                return done(err)
            }

            Logger.info('connected to server.  making request...')
            liveClient.requestAsync(new PingCommand()).then(response => {
                liveClient.close()
                done(new Error('request should have thrown error'))
            }).catch(err => {
                assert.instanceOf(err, BaseError)
                assert.equal(ERROR_MSG, err.getMessage())
                liveClient.close()
                done()
            })
        })


    })
})
