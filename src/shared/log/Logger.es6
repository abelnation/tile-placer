'use strict'

//
// Logger
// Created by aallison on 9/22/15.
//

class Logger {

    static getFileLocation() {
        const e = new Error('dummy')
        const stackLines = e.stack.split('\n').filter(line => {
            return typeof line === 'string' && line.indexOf('.es6') !== -1
        })

        const locationLine = stackLines[3]
        const callerLine = stackLines[4]

        const location = locationLine ? locationLine.match(/[a-zA-Z0-9_-]+\.es6:\d+:\d+/) : undefined
        const caller = callerLine ? callerLine.match(/[a-zA-Z0-9_-]+\.es6:\d+:\d+/) : undefined
        return [caller, location]
    }

    static log(str, obj, prefix) {
        const [caller, location] = Logger.getFileLocation()
        let locationSuffix = ''
        if (caller && location) {
            locationSuffix = ` (${ caller } -> ${ location })`
        } else if (location) {
            locationSuffix = ` (${ location })`
        }
        console.log(`${ prefix }: ${ str }${ locationSuffix }`)
        if (obj) {
            Logger.logObject(obj)
        }
    }

    static logObject(obj) {
        try {
            if (!obj) {
                return
            } else if (obj instanceof String) {
                console.log(obj)
            } else if (obj instanceof Error) {
                console.log(obj.stack)
            } else if (typeof obj.toMinimalJSON === 'function') {
                console.log(JSON.stringify(obj.toMinimalJSON(), null, 2))
            } else {
                console.log(JSON.stringify(obj, null, 2))
            }
        } catch (e) {
            console.log(e.stack)
            console.log(BaseModel)
            console.log(JSON.stringify(obj))
        }

    }

    static error(str, obj) {
        Logger.log(str, obj, 'ERROR')

    }

    static warn(str, obj) {
        Logger.log(str, obj, 'WARN ')
    }

    static info(str, obj) {
        Logger.log(str, obj, 'INFO ')
    }

    static debug(str, obj) {
        Logger.log(str, obj, 'DEBUG')
    }

    static trace(str, obj) {
        Logger.log(str, obj, 'TRACE')
    }
}
module.exports = Logger
