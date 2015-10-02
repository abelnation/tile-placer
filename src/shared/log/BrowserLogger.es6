'use strict'

//
// BrowserLogger
// Created by aallison on 9/22/15.
//

const errors = require('../errors')
const Logger = require('./Logger')

class BrowserLogger extends Logger {
    static error(str, obj) {
        BrowserLogger.logWithStyle(str, obj, 'color: red; font-weigh: bold;')
    }

    static warn(str, obj) {
        BrowserLogger.logWithStyle(str, obj, 'color: orange; font-weigh: bold;')
    }

    static info(str, obj) {
        BrowserLogger.logWithStyle(str, obj, 'color: blue; font-weight: bold;')
    }

    static debug(str, obj) {
        BrowserLogger.logWithStyle(str, obj, 'color: green;')
    }

    static trace(str, obj) {
        BrowserLogger.logWithStyle(str, obj, 'color: gray; font-size: 9px;')
    }

    static logWithStyle(str, obj, css) {
        console.log(`%c${ str }`, css)
        if (obj) {
            if (obj instanceof Error) {
                obj = errors.toJSON(obj)
            }
            console.log(obj)
        }
    }
}
module.exports = BrowserLogger
