'use strict'

//
// CommandCenter
// Created by aallison on 10/2/15.
//

const BaseCommand = require('../../shared/models/commands/BaseCommand')
const MessageChannel = require('../../shared/network/channel/MessageChannel')

class CommandCenter {
    listen(gameMessageChannel) {
        gameMessageChannel.on(MessageChannel.EVENT_NETWORK_MESSAGE, command => {

            if (command instanceof BaseCommand) {

                command.executeAsync({}).then(result => {
                    gameMessageChannel.send(result)
                }).catch(error => {
                    gameMessageChannel.send({ error: error, command: command })
                })

            } else {
                console.log('Invalid command: Not subclass of BaseCommand')
                console.log(JSON.stringify(command))
            }

        })

        gameMessageChannel.on(MessageChannel.EVENT_NETWORK_ERROR, networkMessage => {
            console.log('user command error')
            console.log(JSON.stringify(networkMessage))
        })
    }
}
module.exports = new CommandCenter()
