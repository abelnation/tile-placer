'use strict'

//
// MessageChannel
// Created by aallison on 9/30/15.
//

const EventEmitter = require('events').EventEmitter

class MessageChannel extends EventEmitter {
    send(message) {}
    close() {}
}

MessageChannel.EVENT_NETWORK_MESSAGE = 'network-message'
MessageChannel.EVENT_NETWORK_ERROR = 'network-error'


module.exports = MessageChannel
