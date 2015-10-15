'use strict'

//
// GameClient
// Created by aallison on 10/4/15.
//

const promisifyAll = require('bluebird').promisifyAll

const uuid = require('../util/uuid')
const detach = require('../util/detach')

const LiveClient = require('../network/liveclient/LiveClient')

const User = require('../models/User')

const EchoCommand = require('../models/game/commands/EchoCommand')
const AddGuessCommand = require('../models/game/commands/AddGuessCommand')
const GetStateCommand = require('../models/game/commands/GetStateCommand')

class GameClient {
    constructor(liveClient) {
        this.client = liveClient

        this.listeners = {}

        this.user = new User(uuid.getRandomUuid())
        promisifyAll(this)
    }

    static connectTCP(host, port, done) {
        LiveClient.connectTCP(host, port, (err, liveClient) => {
            if (err) {
                return done(err)
            }
            done(null, new GameClient(liveClient))
        })
    }

    static connectBrowserWebSocket(url, done) {
        LiveClient.connectBrowserWebSocket(url, (err, liveClient) => {
            if (err) {
                return done(err)
            }
            done(null, new GameClient(liveClient))
        })
    }

    disconnect() {
        this.client.close()
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
    }

    getState(done) {
        this.client.requestAsync(new GetStateCommand()).then(result => {
            detach(done, null, result)
        }).catch(err => {
            detach(done, err)
        })
    }

}
module.exports = GameClient
