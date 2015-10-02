'use strict'

//
// WebSocketMessageChannel
// Created by aallison on 9/30/15.
//

const MessageChannel = require('./MessageChannel')
const ModelManager = require('../../../shared/models/ModelManager')
const NetworkMessage = require('../../../shared/models/NetworkMessage')
const CommandCenter = require('../CommandCenter')

class WebSocketMessageChannel extends MessageChannel {
    constructor(webSocket) {
        super()
        if (!webSocket) {
            throw new Error('webSocket is null')
        }

        this.webSocket = webSocket

        const socket = webSocket.upgradeReq.connection
        this.localId = `${ socket.localAddress }:${ socket.localPort }`
        this.remoteId = `${ socket.remoteAddress }:${ socket.remotePort }`

        this.init()
    }

    init() {
        const webSocket = this.webSocket

        console.log(`client connected: ${ this.remoteId } => ${ this.localId }`)
        webSocket.send('connected\n')

        webSocket.on('open', () => {
            console.log('webSocket.open')
        })

        webSocket.on('close', (code, message) => {
            console.log('webSocket.close')
        })

        webSocket.on('error', (error) => {
            console.log('webSocket.error')
            console.log(JSON.stringify(error))
            console.log(error.stack)
            this.emit(MessageChannel.EVENT_NETWORK_ERROR, { error: 'websocket error', data: error })
        })

        webSocket.on('message', (data, flags) => {
            console.log('webSocket.onmessage')
            console.log(`received data: ${ JSON.stringify(data) }`)

            let networkMessage
            try {
                networkMessage = ModelManager.fromJSON(data)
            } catch(e) {
                console.log('error parsing model from json: ' + JSON.stringify(data))
                console.log(e.stack)
                const error = { error: 'invalid model json', data: data }
                this.send(new NetworkMessage(error))
                return
            }

            if (networkMessage.error) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, networkMessage)
                this.send(new NetworkMessage(networkMessage))
            } else if(!(networkMessage instanceof NetworkMessage)) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, { error: 'data received not instance of NetworkMessage', data: data })
            } else {
                this.emit(MessageChannel.EVENT_NETWORK_MESSAGE, networkMessage.getMessage())
            }
        })

        webSocket.on('ping', (data, flags) => {
            console.log('webSocket.onmessage')
        })

        webSocket.on('pong', (data, flags) => {
            console.log('webSocket.onmessage')
        })
    }

    send(content) {
        this.webSocket.send(JSON.stringify(new NetworkMessage(content)))
    }

    close() {
        // TODO: (aallison) send any data?
        const code = undefined
        const data = undefined
        this.webSocket.close(code, data)
    }

    static fromWebSocket(webSocket) {
        return new WebSocketMessageChannel(webSocket)
    }
}
module.exports = WebSocketMessageChannel
