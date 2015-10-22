'use strict'

//
// ModelManager
// Created by aallison on 9/30/15.
//

const BaseModel = require('./BaseModel')
const BaseError = require('./error/BaseError')

const models = {
    'BaseModel': BaseModel,
    // BEGIN auto-generated models code
    'BaseCommand': require('./commands/BaseCommand.es6'),
    'PingCommand': require('./commands/PingCommand.es6'),
    'PlayerCommand': require('./commands/PlayerCommand.es6'),
    'RequestAckCommand': require('./commands/RequestAckCommand.es6'),
    'TestIllegalCommand': require('./commands/TestIllegalCommand.es6'),
    'BaseError': require('./error/BaseError.es6'),
    'Board': require('./game/Board.es6'),
    'GetStateCommand': require('./game/commands/GetStateCommand.es6'),
    'PlaceLakeCommand': require('./game/commands/PlaceLakeCommand.es6'),
    'StartGameCommand': require('./game/commands/StartGameCommand.es6'),
    'Effect': require('./game/Effect.es6'),
    'EffectResult': require('./game/EffectResult.es6'),
    'StateChangedEvent': require('./game/events/StateChangedEvent.es6'),
    'GameState': require('./game/GameState.es6'),
    'AddGuessCommand': require('./game/guess-commands/AddGuessCommand.es6'),
    'EchoCommand': require('./game/guess-commands/EchoCommand.es6'),
    'GetStateCommand': require('./game/guess-commands/GetStateCommand.es6'),
    'Guess': require('./game/Guess.es6'),
    'Market': require('./game/Market.es6'),
    'Placement': require('./game/Placement.es6'),
    'Player': require('./game/Player.es6'),
    'SimpleState': require('./game/SimpleState.es6'),
    'Slot': require('./game/Slot.es6'),
    'Tile': require('./game/Tile.es6'),
    'NetworkMessage': require('./network/channel/NetworkMessage.es6'),
    'AckResponse': require('./network/liveclient/AckResponse.es6'),
    'LiveClientErrorResponse': require('./network/liveclient/LiveClientErrorResponse.es6'),
    'LiveClientRequest': require('./network/liveclient/LiveClientRequest.es6'),
    'LiveClientResponse': require('./network/liveclient/LiveClientResponse.es6'),
    'ServerEvent': require('./network/ServerEvent.es6'),
    'User': require('./User.es6'),
    // END   auto-generated models code
}

const ModelManager = {
    getModel(name) {
        if (!(name in models)) {
            throw new BaseError(`Invalid model name: ${ name }`)
        }
        return models[name]
    },

    createModel(name, klass) {
        console.log(`createModel(${ name }, ${ klass }`)
        if (name in models) {
            throw new BaseError(`Model ${ name } already exists`)
        }
        models[name] = klass
        return klass
    },

    fromJSON(json) {
        if (!json) {
            throw new BaseError('json is undefined')
        }

        if (typeof json == 'string') {
            json = JSON.parse(json)
        }

        if (!json.type) {
            throw new BaseError('model has no type attribute')
        }

        if (json instanceof BaseModel) {
            return json
        }

        console.log(`ModelManager.fromJSON: ${ json.type }`)
        const Ctor = ModelManager.getModel(json.type)
        const result = new Ctor().initFromJSON(json)

        return result
    }
}
module.exports = ModelManager
