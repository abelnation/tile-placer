'use strict'

//
// SocketWrapper
// Created by aallison on 9/30/15.
//

const _ = require('underscore')
const EventEmitter = require('events').EventEmitter

class SocketWrapper extends EventEmitter {
    constructor(socket) {
        super()

        this.socket = socket

        // copy all socket properties over into this object
        // for easier access
        _.extend(this, _.pick(socket, [
            'remoteAddress',
            'remoteFamily',
            'remotePort',
            'localAddress',
            'localPort',
            'bytesRead',
            'bytesWritten',
            'bufferSize',
        ]))

        this.init()
    }

    init() {

        this.socket.on('connect', () => {
            this.onConnect()
        })

        this.socket.on('data', (data) => {
            this.onData(data)
        })

        this.socket.on('error', err => {
            this.onError(err)
        })

        this.socket.on('end', () => {
            this.onEnd()
        })

        this.socket.on('timeout', () => {
            this.onTimeout()
        })

        this.socket.on('close', hadError => {
            this.onClose(hadError)
        })

        return this
    }

    // Override these methods in subclasses
    onConnect() {
        this.emit('connect')
    }

    onData(data) {
        console.log('SocketWrapper.onData')
        this.emit('data', data)
    }

    onError(err) {
        console.log('SocketWrapper.onError')
        this.emit('error', err)
    }

    onEnd() {
        this.emit('end')
    }

    onTimeout() {
        this.emit('timeout')
    }

    onClose(hadError) {
        this.emit('close', hadError)
    }

    // Socket methods to delegate to socket object
    write(data) {
        this.socket.write(data)
    }

    setTimeout(timeoutMs) {
        this.socket.setTimeout(timeoutMs)
    }

    end(data) {
        this.socket.end(data)
    }

    // getters for basic socket properties
    getRemoteAddress() {
        return this.socket.remoteAddress
    }

    getRemoteFamily() {
        return this.socket.remoteFamily
    }

    getRemotePort() {
        return this.socket.remotePort
    }

    getLocalAddress() {
        return this.socket.localAddress
    }

    getLocalPort() {
        return this.socket.localPort
    }

    getBytesRead() {
        return this.socket.bytesRead
    }

    getBytesWritten() {
        return this.socket.bytesWritten
    }

    getBufferSize() {
        return this.socket.bufferSize
    }

}
module.exports = SocketWrapper
