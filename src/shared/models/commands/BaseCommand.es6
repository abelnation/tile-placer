'use strict'

//
// BaseCommand
// Created by aallison on 9/30/15.
//

const promisify = require('bluebird').promisify
const BaseModel = require('../BaseModel')

class BaseCommand extends BaseModel {
    constructor() {
        super()
        this.executeAsync = promisify(this.execute, this)
    }
    execute(gameState, done) {}
}
module.exports = BaseCommand
