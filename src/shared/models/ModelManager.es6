'use strict'

//
// ModelManager
// Created by aallison on 9/30/15.
//

const models = {
    'BaseModel': require('./BaseModel'),
    // BEGIN auto-generated models code
    'NetworkMessage': require('./NetworkMessage.es6'),
    'BaseCommand': require('./commands/BaseCommand.es6'),
    'EchoCommand': require('./commands/EchoCommand.es6'),
    // END   auto-generated models code
}

const ModelManager = {
    getModel(name) {
        if (!(name in models)) {
            throw new Error(`Invalid model name: ${ name }`)
        }
        return models[name]
    },

    createModel(name, klass) {
        console.log(`createModel(${ name }, ${ klass }`)
        if (name in models) {
            throw new Error(`Model ${ name } already exists`)
        }
        models[name] = klass
        return klass
    },

    fromJSON(json) {
        if (!json) {
            throw new Error('json is undefined')
        }

        if (typeof json === 'string') {
            json = JSON.parse(json)
        }

        if (!json.type) {
            throw new Error('model has no type attribute')
        }
        
        const Ctor = ModelManager.getModel(json.type)
        const result = new Ctor().initFromJSON(json)

        return result
    }
}
module.exports = ModelManager
