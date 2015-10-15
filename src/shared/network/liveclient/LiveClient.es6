'use strict'

//
// LiveClient
// Created by aallison on 10/5/15.
//

const EventEmitter = require('events').EventEmitter
const bluebird = require('bluebird')

const BaseError = require('../../models/error/BaseError')
const MessageChannel = require('../../network/channel/MessageChannel')
const TcpMessageChannel = require('../../network/channel/TcpMessageChannel')
const BrowserWebSocketMessageChannel = require('../channel/BrowserWebSocketMessageChannel')
const NodeWebSocketMessageChannel = require('../channel/NodeWebSocketMessageChannel')

const AckResponse = require('../../models/network/liveclient/AckResponse')
const LiveClientRequest = require('../../models/network/liveclient/LiveClientRequest')
const LiveClientResponse = require('../../models/network/liveclient/LiveClientResponse')
const LiveClientErrorResponse = require('../../models/network/liveclient/LiveClientErrorResponse')

const EVENT_REQUEST = 'request'
const EVENT_ERROR = 'error'

const REQUEST_TIMEOUT = 2000

/**
 * Wrapper object for response listeners
 * Each time a request is made, we register a listener for the
 * request id, so that we can associate success or error responses
 * with the correct request.
 */
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

/**
 * Wrapper object handled to a request handler providing convenience methods
 * for writing a response to the requesting channel.
 */
class ResponseWriter {
    constructor(channel, liveClientRequest) {
        this.channel = channel
        this.request = liveClientRequest
    }

    error(error) {
        const response = new LiveClientErrorResponse(this.request, error)
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

        // Map of requestId -> response handlers for that request
        this.listeners = {}

        // Hook network channel to handlers
        this.channel = channel
        channel.on(MessageChannel.EVENT_NETWORK_MESSAGE, this.onNetworkMessage.bind(this))
        channel.on(MessageChannel.EVENT_NETWORK_ERROR, this.onNetworkError.bind(this))
        channel.on('close', this.onClose.bind(this))

        // Promisified verisons of methods
        this.requestAsync = bluebird.promisify(this.request, this)
    }

    static connectTCP(host, port, done) {
        TcpMessageChannel.connect(host, port, (err, channel) => {
            if (err) {
                return done(err)
            }
            done(null, new LiveClient(channel))
        })
    }

    static connectBrowserWebSocket(url, done) {
        BrowserWebSocketMessageChannel.connect(url, (err, channel) => {
            if (err) {
                return done(err)
            }
            done(null, new LiveClient(channel))
        })
    }

    static connectNodeWebSocket(url, done) {
        NodeWebSocketMessageChannel.connect(url, (err, channel) => {
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
            throw new BaseError('requestId already sent')
        }

        // Register listener for response
        this.listeners[req.getRequestId()] = new RequestListener(req, (err, result) => {
            if (err) {
                delete this.listeners[req.getRequestId()]
                return done(err)
            }

            delete this.listeners[req.getRequestId()]

            if (result instanceof LiveClientErrorResponse) {
                return done(result.getError())
            }

            if (!(result instanceof LiveClientResponse)) {
                return done(new BaseError(`expected LiveClientResponse, but got: ${ typeof result }`))
            }

            done(null, result.getContent())
        })

        // Send request over socket
        this.channel.send(req)
    }

    // Register a handler callback for incoming requests.
    // Function should be of the form:
    //     function(req, res) { ... }
    //
    // All requests should be responded to.  Send a response with, e.g.:
    //     res.ack()                        <-- sends simple ack response
    //     res.ok('success')                <-- sets content of response to 'success'
    //     res.error(new BaseError('oops')) <-- throws error on client's end
    //
    handle(reqResHandler) {
        this.handler = reqResHandler
    }

    // Close the connection
    close() {
        this.channel.close()
    }

    //
    // Internal Methods
    //

    // Called every time data is received on our network channel
    // Cases are:
    // 1. New incoming request
    // 2. Response to previous outgoing request
    //   2.a: success response
    //   2.b: error response
    onNetworkMessage(content) {
        if (content instanceof LiveClientRequest) {
            this.onIncomingRequest(content)
        } else if (content instanceof LiveClientResponse) {
            this.onResponse(content)
        } else if (content instanceof LiveClientErrorResponse) {
            this.onErrorResponse(content)
        } else {
            console.log('Non-LiveClient network object received')
            console.log(JSON.stringify(content))
        }
    }

    onIncomingRequest(liveClientRequest) {
        if (this.handler) {
            this.handler(liveClientRequest, new ResponseWriter(this.channel, liveClientRequest))
        }
        this.emit(EVENT_REQUEST, new ResponseWriter(this.channel, liveClientRequest))
    }

    onResponse(liveClientResponse) {
        const requestId = liveClientResponse.getRequestId()

        // no listener present
        if (!(requestId in this.listeners)) {
            console.log(`received response but not listening for requestId: ${ requestId }`)
            return
        }

        const requestListener = this.listeners[requestId]
        requestListener.onReply(liveClientResponse)
    }

    onErrorResponse(liveClientErrorResponse) {
        const requestId = liveClientErrorResponse.getRequestId()

        // no listener present
        if (!(requestId in this.listeners)) {
            console.log(`received response but not listening for requestId: ${ requestId }`)
            return
        }

        const requestListener = this.listeners[requestId]
        requestListener.onReply(liveClientErrorResponse)
    }

    onNetworkError(error) {
        this.emit(EVENT_ERROR, error)
    }

    onClose() {
        this.emit('close')
    }

}
module.exports = LiveClient
