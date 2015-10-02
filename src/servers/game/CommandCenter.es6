'use strict'

//
// CommandCenter
// Created by aallison on 10/2/15.
//

const BaseCommand = require('../../shared/models/commands/BaseCommand')
const NetworkMessage = require('../../shared/models/NetworkMessage')
const MessageChannel = require('./channel/MessageChannel')

class CommandCenter {
    listen(gameMessageChannel) {
        gameMessageChannel.on(MessageChannel.EVENT_NETWORK_MESSAGE, command => {

            if (command instanceof BaseCommand) {

                command.executeAsync({}).then(result => {
                    gameMessageChannel.send(new NetworkMessage(result))
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
