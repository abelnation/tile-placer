'use strict'

//
// Logger
// Created by aallison on 9/22/15.
//

class Logger {
    static error(str, obj) {
        console.log(`ERROR: ${ str }`)
        if (obj) {
            console.log(JSON.stringify(obj, null, 2))
        }
    }

    static warn(str, obj) {
        console.log(`WARN:  ${ str }`) // eslint-disable-line no-multi-spaces
        if (obj) {
            console.log(JSON.stringify(obj, null, 2))
        }
    }

    static info(str, obj) {
        console.log(`INFO:  ${ str }`) // eslint-disable-line no-multi-spaces
        if (obj) {
            console.log(JSON.stringify(obj, null, 2))
        }
    }

    static debug(str, obj) {
        console.log(`DEBUG: ${ str }`)
        if (obj) {
            console.log(JSON.stringify(obj, null, 2))
        }
    }

    static trace(str, obj) {
        console.log(`TRACE: ${ str }`)
        if (obj) {
            console.log(JSON.stringify(obj, null, 2))
        }
    }
}
module.exports = Logger
