'use strict'

//
// EchoCommand
// Created by aallison on 9/30/15.
//

const BaseCommand = require('./BaseCommand')

class EchoCommand extends BaseCommand {
    constructor(content) {
        super()
        this.setContent(content)
    }

    getContent() {
        return this.get('content')
    }

    setContent(content) {
        this.set('content', content)
        return this
    }

    execute(gameState, done) {
        done(null, { echo: this.getContent() })
    }
}
module.exports = EchoCommand
