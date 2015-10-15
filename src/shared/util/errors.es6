'use strict'

//
// errors
// Created by aallison on 10/10/15.
//

module.exports = {
    toJSON(error) {
        return {
            message: error.message,
            stack: error.stack.split('\n'),
            code: error.code
        }
    }
}
