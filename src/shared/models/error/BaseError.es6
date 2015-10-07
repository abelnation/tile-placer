'use strict'

//
// BaseError
// Created by aallison on 10/6/15.
//

const BaseModel = require('../BaseModel')

const MESSAGE = 'message'
const STACK = 'stack'
const FILENAME = 'fileName'
const LINENUMBER = 'lineNumber'

const PARAMS = 'params'

class BaseError extends BaseModel {
    constructor(message, params) {
        super()

        const e = new Error(message)

        // Remove error message and stack frame for this constructor call from stack
        const stack = e.stack.split('\n') // split by newline
            .slice(1) // remove error message from top of error.stack
            .filter(v => v.indexOf('BaseError.es6') === -1) // remove any calls in this file
            .map(v => v.trim()) // trim indentation off

        // Caller of error constructor is first line in stack trace
        // Parse location info from stack line
        const caller = stack[0]
        if (caller) {
            //   ex: `at REPLServer.self.eval (repl.js:110:21)`

            // get last token for filelocation
            const tokens = caller.split(' ')
            const callingFile = tokens[tokens.length - 1]

            // pull text out from optional parens
            let match = callingFile.match(/\(?(.*)\)?/)

            if (match) {
                // split by colon
                const [ fileName, lineNumber ] = match[1].split(':')

                this.set(FILENAME, fileName)
                this.set(LINENUMBER, lineNumber)
            }
        }

        this.set(MESSAGE, message)
        this.set(STACK, stack)

        this.set(PARAMS, params)
    }

    getMessage() {
        return this.get(MESSAGE)
    }

    getStack() {
        return this.get(STACK)
    }

    getFileName() {
        return this.get(FILENAME)
    }

    getLineNumber() {
        return this.get(LINENUMBER)
    }

    getParams() {
        return this.get(PARAMS)
    }

    static fromError(error) {
        return new BaseError(error.message)
    }
}

module.exports = BaseError
