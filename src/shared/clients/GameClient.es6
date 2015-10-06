//'use strict'
//
////
//// GameClient
//// Created by aallison on 10/4/15.
////
//
//const net = require('net')
//
//const Constants = require("../Constants")
//const uuid = require('../util/uuid')
//const EventEmitter = require('events').EventEmitter
//const TcpMessageChannel = require('./TcpMessageChannel')
//
//const User = require('../models/User')
//const UserCommandRequest = require('../models/network/UserCommandRequest')
//
//const EchoCommand = require('../models/game/commands/EchoCommand')
//const AddGuessCommand = require('../models/game/commands/AddGuessCommand')
//const GetStateCommand = require('../models/game/commands/GetStateCommand')
//
//class GameClient extends EventEmitter {
//    constructor(host = 'localhost', port = Constants.TCP_SERVER_PORT) {
//        this.host = host
//        this.port = port
//
//        this.listeners = {}
//
//        this.user = new User(uuid.getRandomUuid())
//
//        this.init()
//    }
//
//    init() {
//        this.connect()
//    }
//
//    connect() {
//        this.socket = net.createConnection(this.port, this.host)
//        this.channel = TcpMessageChannel.fromSocket(this.socket)
//    }
//
//    listenForReply(commandRequest, callback) {
//        const commandId = commandRequest.getCommandId()
//
//        if (commandId in this.listeners) {
//            throw new Error('Already listening for commandId')
//        }
//
//        this.listeners[commandId] = new CommandReplyListener(commandRequest, callback)
//    }
//
//    sendCommandRequest(command) {
//        const commandRequest = new UserCommandRequest(
//            this.user,
//            command
//        )
//
//        this.channel.send(commandRequest)
//        this.listenForReply(commandRequest)
//    }
//
//    echo(content, done) {
//        this.sendCommandRequest(new EchoCommand(content))
//    }
//
//    addGuess(guess, done) {
//        this.sendCommandRequest(new AddGuessCommand(guess))
//    }
//
//    getState(done) {
//        this.sendCommandRequest(new GetStateCommand())
//    }
//
//}
//module.exports = GameClient
