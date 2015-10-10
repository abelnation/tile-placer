'use strict'

//
// BrowserWebSocketMessageChannel
// Created by aallison on 10/10/15.
//

const EventEmitter = require('events').EventEmitter

const Logger = require('../../log/BrowserLogger')
const NetworkMessage = require('../../models/network/channel/NetworkMessage')
const MessageChannel = require('./MessageChannel')
const ModelManager = require('../../models/ModelManager')

class BrowserWebSocketMessageChannel extends EventEmitter {
    constructor(browserWebSocket) {
        super()

        this.websocket = browserWebSocket
        this.isClosed = false

        this.init()
    }

    init() {
        const websocket = this.websocket

        websocket.addEventListener('open', (evt) => {
            Logger.trace('BrowserWebSocketMessageChannel.onopen')
            this.connected = true
        })

        websocket.addEventListener('error', (err) => {
            Logger.trace('BrowserWebSocketMessageChannel.onerror', err)
        })

        websocket.addEventListener('close', ({ code, reason, wasClean }) => {
            Logger.trace('BrowserWebSocketMessageChannel.onclose')

            // TODO: (aallison) handle messy close events

            this.isClosed = true
            this.emit('close')
        })

        websocket.addEventListener('message', ({ data }) => {
            Logger.trace('BrowserWebSocketMessageChannel.onmessage', data)

            let networkMessage
            try {
                networkMessage = ModelManager.fromJSON(data)
            } catch(e) {
                console.log('error parsing model from json: ', data)
                console.log(e.stack)

                const error = { error: 'invalid model json', data: data }
                this.send(error)

                return
            }

            if (networkMessage.error) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, networkMessage)
                this.send(networkMessage)
            } else if(!(networkMessage instanceof NetworkMessage)) {
                this.emit(MessageChannel.EVENT_NETWORK_ERROR, { error: 'data received not instance of NetworkMessage', data: data })
            } else {
                this.emit(MessageChannel.EVENT_NETWORK_MESSAGE, networkMessage.getMessage())
            }
        })

        return this
    }

    send(content) {
        this.websocket.send(JSON.stringify(new NetworkMessage(content)))
    }

    getSocketState() {
        return this.websocket.readyState
    }

    static connect(url, done) {
        const browserWebSocket = new WebSocket(url)
        browserWebSocket.addEventListener('open', (evt) => {
            done(null, BrowserWebSocketMessageChannel.fromBrowserWebSocket(browserWebSocket))
        })
    }

    static fromBrowserWebSocket(browserWebSocket) {
        return new BrowserWebSocketMessageChannel(browserWebSocket)
    }
}
module.exports = BrowserWebSocketMessageChannel
