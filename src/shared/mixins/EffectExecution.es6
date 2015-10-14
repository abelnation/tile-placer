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
        this.executeImmediateEffect(placement)
        this.executeConditionalEffects(placement, gameState)
        this.executeAdjacentTileEffects(placement)
        this.executeNonAdjacentTileEffects(placement)
        this.executeOtherPlayerTileEffects(placement, gameState)                
    },

    executeImmediateEffect(placement) {
        let tile = placement.getTile()
        let effect = tile.getImmediateEffect() 

        if (_.isNull(effect)) {
            Logger.info(`No immediate effect for tile ${ tile.name }`)
        } else {
            effect.executeOn(this, placement)
        }
    },

    executeConditionalEffects(placement, gameState=null) {
        let tile = placement.getTile()
        let effects = tile.getConditionalEffects()

        if (_.isEmpty(effects)) {
            Logger.info(`No conditional effect for tile ${ tile.getName() }`)
        } else {
            for (let effect of effects) {
                effect.executeOn(this, placement, gameState)
            }
        }
    },

    executeAdjacentTileEffects(placement) {
        let board = this.getBoard()
        let adjacentPlacements = board.getAdjacentPlacements(placement)
        let relevantConditionTypes = [TileConfig.CONDITION.ADJACENT, TileConfig.CONDITION.EVERY, TileConfig.CONDITION.YOUR, TileConfig.CONDITION.AFTER] 


        for (let adjacentPlacement of adjacentPlacements) {
            let adjacentTile = adjacentPlacement.getTile()
            let adjacentEffects = adjacentTile.getConditionalEffects()
            for (let effect of adjacentEffects) {
                if(_.isEmpty(effect.data) === false) {
                    if (_.contains(relevantConditionTypes, effect.getCondition().type)) {
                        effect.executeIf(this, placement, adjacentPlacement)
                    }
                }
            }
        }
    },

    executeNonAdjacentTileEffects(placement) {
        let board = this.getBoard()
        let existingPlacements = board.getPlacements()
        let relevantConditionTypes = [TileConfig.CONDITION.EVERY, TileConfig.CONDITION.YOUR, TileConfig.CONDITION.AFTER] 

        for (let existingPlacement of existingPlacements) {
            let tile = existingPlacement.getTile()
            let effects = tile.getConditionalEffects()
            for (let effect of effects) {
                if(_.isEmpty(effect.data) === false) {
                    if (_.contains(TileConfig.CONDITION.NONADJACENT, effect.getCondition().type)) {
                        effect.executeIf(this, placement, existingPlacement)
                    }                    
                }
            }
        }
    },

    executeOtherPlayerTileEffects(placement, gameState) {
        let opponents = gameState.opponentsOf(this)
        let otherPlacements = _.map(opponents, (opponent) => {
            return opponent.getBoard().getPlacements()
        })
        let relevantConditionTypes = [TileConfig.CONDITION.EVERY, TileConfig.CONDITION.OTHER, TileConfig.CONDITION.AFTER] 

        for (let placementSet of otherPlacements) {
            for (let placement of placementSet) {
                let tile = placement.getTile()
                let effects = tile.getConditionalEffects()
                for (let effect of effects) {
                    if(_.isEmpty(effect.data) === false) {
                        if (_.contains(relevantConditionTypes, effect.getCondition().type)) {
                            effect.executeIf(this, placement, adjacentPlacement)
                        }
                    }
                }                     
            }
        }
    }
}

module.exports = EffectExecution