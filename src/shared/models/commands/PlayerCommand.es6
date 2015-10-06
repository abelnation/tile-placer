'use strict'

//
// PlayerCommand
// Created by aallison on 10/6/15.
//

const BaseCommand = require('./BaseCommand')

const PLAYER = 'player'

class PlayerCommand extends BaseCommand {
    constructor(player) {
        super()
        this.set(PLAYER, player)
    }

    getPlayer() {
        return this.get(PLAYER)
    }
}
module.exports = PlayerCommand
