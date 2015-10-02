'use strict'

//
// TcpMessageChannel
// Created by aallison on 9/30/15.
//

const es = require('event-stream')

const ModelManager = require('../../../shared/models/ModelManager')
const MessageChannel = require('./MessageChannel')
const NetworkMessage = require('../../../shared/models/NetworkMessage')
const CommandCenter = require('../CommandCenter')

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

        this.init()
    }

    init() {
        const socket = this.socket
        socket.setTimeout(SOCKET_TIMEOUT)

        console.log(`client connected: ${ this.remoteId } => ${ this.localId }`)
        socket.write('connected\n')

        socket.on('connect', () => {
            console.log('socket.connect')
        })

        socket.on('error', err => {
            console.log('socket error')
            console.log(err.stack)
        })

        socket.on('end', () => {
            console.log('client disconnected.  closing...')
            socket.end()
        })

        socket.on('timeout', () => {
            console.log('socket timeout.  closing...')
            socket.end(`connection idle for ${ SOCKET_TIMEOUT }ms. closing...`)
        })

        socket.on('close', hadError => {
            console.log(`socket.close => hadError: ${ hadError }`)
        })

        // Command Stream
        // Parse and de-serialize
        this.commandStream = socket.pipe(es.split()).pipe(es.mapSync(data => {
            try {
                return JSON.parse(data)
            } catch (e) {
                return { error: 'invalid json', data: data }
            }
        })).pipe(es.mapSync(json => {
            try {
                return ModelManager.fromJSON(json)
            } catch (e) {
                console.log('Error in ModelManager.fromJSON')
                console.log(e.stack)
                return { error: 'message json is not a valid model', json: json }
            }
        }))

        // Read as new-line separated json-chunks
        this.commandStream.on('data', model => {


            if (model.error) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, model)
                this.send(new NetworkMessage(model))
            } else if (!(model instanceof NetworkMessage)) {
                const error = { error: 'data sent over network must be type NetworkMessage', model: model }
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, error)
                this.send(new NetworkMessage(error))
            } else {
                this.emit(MessageChannel.EVENT_NETWORK_MESSAGE, model.getMessage())
            }
        })
    }

    send(networkMessage) {
        if (!(networkMessage instanceof NetworkMessage)) {
            throw new Error('send can only take instances of type NetworkMessage')
        }
        this.socket.write(JSON.stringify(networkMessage))
    }

    close() {
        this.socket.end()
    }

    static fromSocket(tcpSocket) {
        return new TcpMessageChannel(tcpSocket)
    }
}
module.exports = TcpMessageChannel
