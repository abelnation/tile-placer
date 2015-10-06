'use strict'

//
// LiveClient
// Created by aallison on 10/5/15.
//

const EventEmitter = require('events').EventEmitter
const bluebird = require('bluebird')

const MessageChannel = require('../../network/channel/MessageChannel')
const TcpMessageChannel = require('../../network/channel/TcpMessageChannel')

const BaseError = require('../../models/error/BaseError')
const AckResponse = require('../../models/network/liveclient/AckResponse')
const LiveClientRequest = require('../../models/network/liveclient/LiveClientRequest')
const LiveClientResponse = require('../../models/network/liveclient/LiveClientResponse')

const EVENT_REQUEST = 'request'
const EVENT_ERROR = 'error'

const REQUEST_TIMEOUT = 2000
class RequestListener {
    constructor(liveClientRequest, callback) {
        this.liveClientRequest = liveClientRequest
        this.callback = callback

        this.timeout = setTimeout(() => {
            this.onTimeout()
        }, REQUEST_TIMEOUT)
    }

    onTimeout() {
        console.log('liveclient request timed out')
        this.callback({ error: 'liveclient request timed out' })
    }

    onReply(result) {
        clearTimeout(this.timeout)
        this.callback(null, result)
    }
}

class RequestHandler {
    constructor(channel, liveClientRequest) {
        this.channel = channel
        this.request = liveClientRequest
    }

    error(error) {
        const response = new LiveClientResponse(this.request, error)
        this.channel.send(response)
    }

    ok(content) {
        const response = new LiveClientResponse(this.request, content)
        this.channel.send(response)
    }

    ack() {
        const response = new AckResponse(this.request)
        this.channel.send(response)
    }
}

class LiveClient extends EventEmitter {
    constructor(channel) {
        super()
        this.listeners = {}

        this.channel = channel
        channel.on(MessageChannel.EVENT_NETWORK_MESSAGE, this.onNetworkMessage.bind(this))
        channel.on(MessageChannel.EVENT_NETWORK_ERROR, this.onNetworkError.bind(this))

        this.requestAsync = bluebird.promisify(this.request, this)
    }

    static connect(host, port, done) {
        TcpMessageChannel.connect(host, port, (err, channel) => {
            if (err) {
                return done(err)
            }
            done(null, new LiveClient(channel))
        })
    }

    static fromSocket(socket) {
        const channel = TcpMessageChannel.fromSocket(socket)
        return new LiveClient(channel)
    }

    request(content, done) {

        const req = new LiveClientRequest(content)

        if (req.getRequestId() in this.listeners) {
            throw new Error('requestId already sent')
        }

        // Register listener for response
        this.listeners[req.getRequestId()] = new RequestListener(req, (err, result) => {
            if (err) {
                delete this.listeners[req.getRequestId()]
                return done(err)
            }

            delete this.listeners[req.getRequestId()]

            if (!(result instanceof LiveClientResponse)) {
                delete this.listeners[req.getRequestId()]
                return done(new Error(`expected LiveClientResponse, but got: ${ typeof result }`))
            }

            const content = result.getContent()
            if (content instanceof BaseError) {
                return done(content)
            }

            done(null, result.getContent())
        })

        // Send request over socket
        this.channel.send(req)
    }

    handle(reqResHandler) {
        this.handler = reqResHandler
    }

    close() {
        this.channel.close()
    }

    //
    // Internal Methods
    //

    onNetworkMessage(content) {
        if (content instanceof LiveClientResponse) {

            const liveClientResponse = content
            const requestId = liveClientResponse.getRequestId()

            // no listener present
            if (!(requestId in this.listeners)) {
                console.log(`received response but not listening for requestId: ${ requestId }`)
                return
            }

            const requestListener = this.listeners[requestId]
            requestListener.onReply(liveClientResponse)

        } else if (content instanceof LiveClientRequest) {

            const liveClientRequest = content

            if (this.handler) {
                this.handler(liveClientRequest, new RequestHandler(this.channel, liveClientRequest))
            }
            this.emit(EVENT_REQUEST, new RequestHandler(this.channel, liveClientRequest))

        } else {
            console.log('Non-LiveClient network object received')
            console.log(JSON.stringify(content))
        }
    }

    onNetworkError(error) {
        this.emit(EVENT_ERROR, error)
    }

}
module.exports = LiveClient
