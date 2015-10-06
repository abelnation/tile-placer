'use strict'

//
// Uuid
// Created by aallison on 9/16/15.
//

const uuid = require('node-uuid')

module.exports = {
    getTimeBasedUuid() {
        // time-based uuid.  makes uuid names a bit more orderly
        return uuid.v1()
    },

    getRandomUuid() {
        return uuid.v4()
    }
}
