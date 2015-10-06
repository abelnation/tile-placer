'use strict'

//
// TcpMessageChannel
// Created by aallison on 9/30/15.
//

const net = require('net')
const es = require('event-stream')

const Logger = require('../../log/Logger')
const MessageChannel = require('./MessageChannel')

const ModelManager = require('../../models/ModelManager')
const NetworkMessage = require('../../models/network/channel/NetworkMessage')
const BaseError = require('../../models/error/BaseError')

// Constants
const SOCKET_TIMEOUT = 30 * 1000

class TcpMessageChannel extends MessageChannel {
    constructor(tcpSocket) {
        super()
        if (!tcpSocket) {
            throw new Error('socket is null')
        }

        this.socket = tcpSocket
        this.localId = `${ tcpSocket.localAddress }:${ tcpSocket.localPort }`
        this.remoteId = `${ tcpSocket.remoteAddress }:${ tcpSocket.remotePort }`

        this.isClosed = false

        this.init()
    }

    init() {
        const socket = this.socket
        socket.setTimeout(SOCKET_TIMEOUT)

        socket.on('connect', () => {
            Logger.debug('socket.connect')
            this.connected = true
        })

        socket.on('error', err => {
            Logger.debug('socket error')
            Logger.debug(err.stack)
        })

        socket.on('end', () => {
            Logger.debug('client disconnected.  closing...')
            socket.end()
        })

        socket.on('timeout', () => {
            Logger.debug('socket timeout.  closing...')
            socket.end(`connection idle for ${ SOCKET_TIMEOUT }ms. closing...`)
        })

        socket.on('close', hadError => {
            Logger.debug(`socket.close => hadError: ${ hadError }`)
            this.isClosed = true
            this.emit('close')
        })

        // Command Stream
        // Parse and de-serialize
        this.commandStream = socket.pipe(
            es.split()
        ).pipe(es.mapSync(data => {
            Logger.debug(`sock >> ${ data }`)
            return data
        })).pipe(es.mapSync(data => {
            // filter empty lines
            if (!data.trim()) {
                return undefined
            }

            try {
                return JSON.parse(data)
            } catch (e) {
                Logger.debug('Invalid JSON:')
                Logger.debug(data)
                return new BaseError('invalid json', { data: data })
            }
        })).pipe(es.mapSync(json => {
            try {
                return ModelManager.fromJSON(json)
            } catch (e) {
                Logger.debug('Error in ModelManager.fromJSON')
                Logger.debug(JSON.stringify(json, null, 2))
                Logger.debug(e.stack)
                return new BaseError('message json is not a valid model', { json: json })
            }
        }))

        // Read as new-line separated json-chunks
        this.commandStream.on('data', model => {
            Logger.debug('TcpMessageChannel.onData: ' + JSON.stringify(model))

            if (model instanceof BaseError) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, model)
                // this.send(model)
            } else if (!(model instanceof NetworkMessage)) {
                const error = new BaseError('data sent over network must be type NetworkMessage', { model: model })
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, error)
                // this.send(error)
            } else {
                this.emit(MessageChannel.EVENT_NETWORK_MESSAGE, model.getMessage())
            }
        })
    }

    send(content) {
        if (this.isClosed) {
            Logger.error('tried to write after socket is closed')
            return
        }
        const message = new NetworkMessage(content)
        Logger.debug(`sock << ${ JSON.stringify(message) }`)
        this.socket.write(JSON.stringify(message) + '\n')
    }

    close() {
        this.socket.end()
    }

    static connect(host, port, done) {
        const socket = new net.Socket()
        socket.connect({
            host: host,
            port: port
        }, () => {
            done(null, TcpMessageChannel.fromSocket(socket))
        })
    }

    static fromSocket(tcpSocket) {
        return new TcpMessageChannel(tcpSocket)
    }
}
module.exports = TcpMessageChannel
