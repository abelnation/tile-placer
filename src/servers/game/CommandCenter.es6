'use strict'

//
// CommandCenter
// Created by aallison on 10/2/15.
//

const BaseCommand = require('../../shared/models/commands/BaseCommand')
const LiveClient = require('../../shared/network/liveclient/LiveClient')
const SimpleState = require('../../shared/models/game/SimpleState.es6')

const gameState = new SimpleState()

class CommandCenter {
    listen(gameMessageChannel) {
        const liveClient = new LiveClient(gameMessageChannel)
        liveClient.handle((req, res) => {
            const cmd = req.getContent()
            if (cmd instanceof BaseCommand) {
                cmd.executeAsync(gameState).then(result => {
                    res.ok(result)
                }).catch(err => {
                    Logger.error('error executing command', err.stack)
                    res.error(err)
                })
            } else {
                res.error(new BaseError('cmd not instance of PingCommand'))
            }
        })
    }
}
module.exports = new CommandCenter()
