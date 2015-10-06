'use strict'

//
// TestIllegalCommand
// Created by aallison on 10/2/15.
//

const BaseCommand = require('./BaseCommand')

class TestIllegalCommand extends BaseCommand {
    constructor() {
        super()
    }

    execute(gameState, done) {
        done({ message: 'illegal command' })
    }
}
module.exports = TestIllegalCommand
