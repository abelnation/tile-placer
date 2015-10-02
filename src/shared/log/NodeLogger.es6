'use strict'

//
// NodeLogger
// Created by aallison on 9/22/15.
//

const Logger = require('./Logger')
const chalk = require('chalk')
const errors = require('../errors')

class NodeLogger extends Logger {

    static logWithColor(str, obj, colorFn) {
        console.log(colorFn(str))
        if (obj) {
            if (obj instanceof Error) {
                obj = errors.toJSON(obj)

                console.log(colorFn(`Error: ${ obj.message }`))
                console.log(colorFn(obj.stack))
            } else {
                console.log(colorFn(JSON.stringify(obj, null, 2)))
            }

        }
    }

    static error(str, obj) {
        NodeLogger.logWithColor(str, obj, chalk.red)
    }

    static warn(str, obj) {
        NodeLogger.logWithColor(str, obj, chalk.yellow) // eslint-disable-line no-multi-spaces
    }

    static info(str, obj) {
        NodeLogger.logWithColor(str, obj, chalk.white) // eslint-disable-line no-multi-spaces
    }

    static debug(str, obj) {
        NodeLogger.logWithColor(str, obj, chalk.green)
    }

    static trace(str, obj) {
        NodeLogger.logWithColor(str, obj, chalk.gray)
    }
}
module.exports = NodeLogger
