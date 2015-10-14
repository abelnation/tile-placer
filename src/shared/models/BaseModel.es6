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
        BaseModel.convertDataToModels(this.data)

        return this
    }

    get(key) {
        return this.data[key]
    }

    set(key, value) {
        this.data[key] = value
        return this
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

    static convertDataToModels(data) {
        const ModelManager = require('./ModelManager')
        if (_.isArray(data)) {

            console.log('Model-ifying an array')

            _.each(data, (val, index, list) => {
                if (_.isObject(val) && _.has(val, 'type')) {

                    console.log('Found nested model in array')

                    list[index] = ModelManager.fromJSON(val)
                } else if (_.isObject(val)) {
                    // true for arrays *and* objects
                    BaseModel.convertDataToModels(val)
                }
            })
        } else if (_.isObject(data)) {

            console.log('Model-ifying an object')

            _.each(data, (val, key, list) => {
                if (_.isObject(val) && _.has(val, 'type')) {

                    console.log('Found nested model in object')

                    list[key] = ModelManager.fromJSON(val)
                } else if (_.isObject(val)) {
                    // true for arrays *and* objects
                    BaseModel.convertDataToModels(val)
                }
            })
        } else {
            throw new Error('data is not a valid object or array')
        }
    }
}
module.exports = BaseModel
