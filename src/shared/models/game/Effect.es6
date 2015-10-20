'use strict'

//
// Effect
// Created by dpekar on 10/12/15.
//

const _ = require('underscore')
// const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
const EffectResult = require('./EffectResult')
const TileConfig = require('../../data/Tile-config')

class Effect extends BaseModel {
    constructor(effectInfo) {
        super()
        this.setFromObject(effectInfo)
    }

    getStat() { return this.get('stat') }
    getValue() { return this.get('value') }
    getCondition() { return this.get('condition') }

    isNull() {
      if (_.isUndefined(this.getStat())) {
        return true
      } else {
        return false
      }
    }

    executeNewTileEffects(player, placement, gameState) {
        let condition = this.getCondition()
        let board = player.getBoard()
        let result = []

        let stat = this.getStat()
        let value = this.getValue()

        if (_.isUndefined(condition)) {
            result.push(new EffectResult(placement, stat, value))
            player.incrementStat(stat, value)
        }
        else {
            let allPlayers = gameState.getPlayers()

            switch (condition.type) {
                case (TileConfig.CONDITION.ADJACENT):
                    let neighbors = board.getAdjacentPlacements(placement)
                    for (let neighbor of neighbors) {
                        let tile = neighbor.getTile()

                        if (tile.meetsCondition(condition)) {
                            result.push(new EffectResult(placement, stat, value))
                            player.incrementStat(stat, value)
                        }
                    }
                    break
                case (TileConfig.CONDITION.EVERY):
                    let allPlacements = _.map(allPlayers, (player) => {
                        return player.getBoard().getPlacements()
                    })

                    for (let playerPlacements of allPlacements) {
                        for (let existingPlacement of playerPlacements) {
                            let tile = existingPlacement.getTile()

                            if (tile.meetsCondition(condition)) {
                                result.push(new EffectResult(placement, stat, value))
                                player.incrementStat(stat, value)
                            }
                        }
                    }
                    break
                case (TileConfig.CONDITION.OTHER):
                    let opponents = gameState.opponentsOf(player)
                    let otherPlacements = _.map(opponents, (opponent) => {
                        return opponent.getBoard().getPlacements()
                    })

                    for (let placementSet of otherPlacements) {
                        for (let placement of placementSet) {
                            if (placement.getTile().meetsCondition(condition)) {
                                result.push(new EffectResult(placement, stat, value))
                                player.incrementStat(stat, value)
                            }
                        }
                    }
                    break
                case (TileConfig.CONDITION.YOUR):
                    let yourPlacements = board.getPlacements()
                    for (let placement of yourPlacements) {
                        if (placement.getTile().meetsCondition(condition)) {
                            result.push(new EffectResult(placement, stat, value))
                            player.incrementStat(stat, value)
                        }
                    }
                    break
                case (TileConfig.CONDITION.AFTER):
                    Logger.info('No conditional effect executes immediately for tile with an `after` effect.')
                    break
                default:  // There is no condition specified
                    break
           }
        }

        return result
    }


    executeExistingTileEffects(player, newPlacement, existingPlacement) {
        let condition = this.getCondition()
        let tile = newPlacement.getTile()
        let result = []

        let stat = this.getStat()
        let value = this.getValue()

        if (tile.meetsCondition(condition)) {
            if(existingPlacement.alreadyInvestedIn() === true) {
                result.push(new EffectResult(newPlacement, stat, value))
                player.incrementStat(stat, value)
            }  // Execute the effect twice if the person invested in the tile already
            player.incrementStat(stat, value)
            result.push(new EffectResult(newPlacement, stat, value))

        }
        return result
    }

}

module.exports = Effect
