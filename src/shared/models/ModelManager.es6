'use strict'

//
// ModelManager
// Created by aallison on 9/30/15.
//

const BaseModel = require('./BaseModel')

const models = {
    'BaseModel': BaseModel,
    // BEGIN auto-generated models code
    'User': require('./User.es6'),
    'BaseCommand': require('./commands/BaseCommand.es6'),
    'PingCommand': require('./commands/PingCommand.es6'),
    'PlayerCommand': require('./commands/PlayerCommand.es6'),
    'RequestAckCommand': require('./commands/RequestAckCommand.es6'),
    'TestIllegalCommand': require('./commands/TestIllegalCommand.es6'),
    'BaseError': require('./error/BaseError.es6'),
    'SimpleState': require('./game/SimpleState.es6'),
    'AddGuessCommand': require('./game/commands/AddGuessCommand.es6'),
    'EchoCommand': require('./game/commands/EchoCommand.es6'),
    'GetStateCommand': require('./game/commands/GetStateCommand.es6'),
    'StateChangedEvent': require('./game/events/StateChangedEvent.es6'),
    'ServerEvent': require('./network/ServerEvent.es6'),
    'NetworkMessage': require('./network/channel/NetworkMessage.es6'),
    'AckResponse': require('./network/liveclient/AckResponse.es6'),
    'LiveClientRequest': require('./network/liveclient/LiveClientRequest.es6'),
    'LiveClientResponse': require('./network/liveclient/LiveClientResponse.es6'),
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

        if (typeof json == 'string') {
            json = JSON.parse(json)
        }

        if (!json.type) {
            throw new Error('model has no type attribute')
        }

        if (json instanceof BaseModel) {
            return json
        }

        const Ctor = ModelManager.getModel(json.type)
        const result = new Ctor().initFromJSON(json)

        return result
    }
}
module.exports = ModelManager
