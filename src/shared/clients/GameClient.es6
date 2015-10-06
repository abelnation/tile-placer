'use strict'

//
// GameClient
// Created by aallison on 10/4/15.
//

const Constants = require('../Constants')
const uuid = require('../util/uuid')
const detach = require('../util/detach')

const LiveClient = require('../network/liveclient/LiveClient')

const User = require('../models/User')

const EchoCommand = require('../models/game/commands/EchoCommand')
const AddGuessCommand = require('../models/game/commands/AddGuessCommand')
const GetStateCommand = require('../models/game/commands/GetStateCommand')

class GameClient extends EventEmitter {
    constructor(host = 'localhost', port = Constants.TCP_SERVER_PORT) {
        this.host = host
        this.port = port

        this.listeners = {}

        this.user = new User(uuid.getRandomUuid())

        this.init()
    }

    init() {
        this.connect()
    }

    connect(done) {
        LiveClient.connect(this.host, this.port, (err, liveClient) => {
            if (err) {
                return done(err)
            }
            this.client = liveClient
            done(null, this)
        })
    }

    echo(content, done) {
        this.client.requestAsync(new EchoCommand(content)).then(result => {
            detach(done, null, result)
        }).catch(err => {
            detach(done, err)
        })
    }

    addGuess(guess, done) {
        this.client.requestAsync(new AddGuessCommand(this.user, guess)).then(result => {
            detach(done, null, result)
        }).catch(err => {
            detach(done, err)
        })

        this.sendCommandRequest()
    }

    getState(done) {
        this.sendCommandRequest(new GetStateCommand())
    }

}
module.exports = GameClient
