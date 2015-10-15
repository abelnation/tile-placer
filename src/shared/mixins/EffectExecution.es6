'use strict'

//
// EffectExecution
// Created by dpekar on 10/13/15.
//

const Logger = require('../log/Logger')

const _ = require('underscore')
const TileConfig = require('../data/Tile-config')

const EffectExecution = {

    executeAllEffects(placement, gameState) {
        let result = []

        result.push(this.executeImmediateEffect(placement))
        result.push(this.executeConditionalEffects(placement, gameState))
        result.push(this.executeAdjacentTileEffects(placement))
        result.push(this.executeNonAdjacentTileEffects(placement))
        result.push(this.executeOtherPlayerTileEffects(placement, gameState))

        return _.flatten(result)
    },

    executeImmediateEffect(placement) {
        let tile = placement.getTile()
        let effect = tile.getImmediateEffect() 
        let result = []

        if (_.isNull(effect)) {
            Logger.info(`No immediate effect for tile ${ tile.name }`)
        } else {
            result.push(effect.executeNewTileEffects(this, placement))
        }

        return result
    },

    executeConditionalEffects(placement, gameState=null) {
        let tile = placement.getTile()
        let effects = tile.getConditionalEffects()
        let result = []

        if (_.isEmpty(effects)) {
            Logger.info(`No conditional effect for tile ${ tile.getName() }`)
        } else {
            for (let effect of effects) {
                result.push(effect.executeNewTileEffects(this, placement, gameState))
            }
        }
        return result
    },

    executeAdjacentTileEffects(placement) {
        let board = this.getBoard()
        let adjacentPlacements = board.getAdjacentPlacements(placement)
        let relevantConditionTypes = [TileConfig.CONDITION.ADJACENT, TileConfig.CONDITION.EVERY, TileConfig.CONDITION.YOUR, TileConfig.CONDITION.AFTER] 
        let result = []


        for (let adjacentPlacement of adjacentPlacements) {
            let adjacentTile = adjacentPlacement.getTile()
            let adjacentEffects = adjacentTile.getConditionalEffects()
            for (let effect of adjacentEffects) {
                if(_.isEmpty(effect.data) === false) {
                    if (_.contains(relevantConditionTypes, effect.getCondition().type)) {
                        result.push(effect.executeExistingTileEffects(this, placement, adjacentPlacement))
                    }
                }
            }
        }
        return result
    },

    executeNonAdjacentTileEffects(placement) {
        let board = this.getBoard()
        let existingPlacements = board.getPlacements()
        let relevantConditionTypes = [TileConfig.CONDITION.EVERY, TileConfig.CONDITION.YOUR, TileConfig.CONDITION.AFTER] 
        let result = []

        for (let existingPlacement of existingPlacements) {
            let tile = existingPlacement.getTile()
            let effects = tile.getConditionalEffects()
            for (let effect of effects) {
                if(_.isEmpty(effect.data) === false) {
                    if (_.contains(relevantConditionTypes, effect.getCondition().type)) {
                        result.push(effect.executeExistingTileEffects(this, placement, existingPlacement))
                    }                    
                }
            }
        }
        return result
    },

    executeOtherPlayerTileEffects(placement, gameState) {
        let opponents = gameState.opponentsOf(this)
        let otherPlacements = _.map(opponents, (opponent) => {
            return opponent.getBoard().getPlacements()
        })
        let relevantConditionTypes = [TileConfig.CONDITION.EVERY, TileConfig.CONDITION.OTHER, TileConfig.CONDITION.AFTER] 
        let result = []

        for (let placementSet of otherPlacements) {
            for (let placement of placementSet) {
                let tile = placement.getTile()
                let effects = tile.getConditionalEffects()
                for (let effect of effects) {
                    if(_.isEmpty(effect.data) === false) {
                        if (_.contains(relevantConditionTypes, effect.getCondition().type)) {
                            result.push(effect.executeExistingTileEffects(this, placement, adjacentPlacement))
                        }
                    }
                }                     
            }
        }
        return result
    }
}

module.exports = EffectExecution