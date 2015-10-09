'use strict'

//
// BaseModel
// Created by aallison on 9/30/15.
//

const _ = require('underscore')
const objUtils = require('../util/object')
const Logger = require('../log/Logger')

class BaseModel {
    constructor() {
        this.data = {}
        this.type = this.constructor.name
    }

    init() {
        return this
    }

    initFromJSON(json) {
        _.extend(this, json)
        // hydrate any nested models in data
        _.each(this.data, (val, key) => {
            if (_.isObject(val) && _.has(val, 'type')) {
                // TODO: (aallison) BUG for some reason, ModelManager is an empty object
                //                  after the first require above.  requiring when
                //                  it's needed works as a workaround.
                this.data[key] = require('./ModelManager').fromJSON(val)
            }
        })
        return this
    }

    get(key) {
        return this.data[key]
    }

    set(key, value) {
        this.data[key] = value
        return this
    }

    setFromObject(object) {
        _.each(object, (val, key) => {
            this.set(key, val)
        })
    }

    toJSON() {
        const result = { type: this.type }
        result.data = objUtils.map(this.data, v => {
            if (v instanceof Error) {
                Logger.debug('serializing error in model', v.stack)
                return {
                    message: v.message,
                    stack: v.stack
                }
            } else if (_.isObject(v) && !_.isUndefined(v.toJSON)) {
                return v.toJSON()
            } else {
                return v
            }
        })

        return result
    }

    toMinimalJSON() {
        const result = objUtils.map(this.data, val => {
            if (val instanceof BaseModel) {
                return val.toMinimalJSON()
            } else {
                return val
            }
        })
        return result
    }
}
module.exports = BaseModel
