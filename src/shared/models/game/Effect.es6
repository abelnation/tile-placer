'use strict'

//
// Effect
// Created by dpekar on 10/12/15.
//

const _ = require('underscore')
const Logger = require('../../log/Logger')

const BaseModel = require('../BaseModel')
// const StatsConfig = require('../../data/Stats-config')
const TileConfig = require('../../data/Tile-config')

class Effect extends BaseModel {
    constructor(effectInfo) {
        super()
        this.setFromObject(effectInfo)        
    }

    getStat() { return this.get('stat') }
    getValue() { return this.get('value') }
    getCondition() { return this.get('condition') }

    executeIf(player, newPlacement, existingPlacement) {
        let condition = this.getCondition()
        let tile = newPlacement.getTile()
        if (tile.meetsCondition(condition)) {
            Logger.info(`${tile.getName()} because of ${existingPlacement.getTile().getName()} produces ${this.getValue()} ${this.getStat()}`)
            if(existingPlacement.alreadyInvestedIn() === true) {
                player.incrementStat(this.getStat(), this.getValue())
            }  // Execute the effect twice if the person invested in the tile already
            player.incrementStat(this.getStat(), this.getValue())
        }
    }

    executeOn(player, placement, gameState) {
        let condition = this.getCondition()
        let board = player.getBoard()

        if (_.isUndefined(condition)) {
            Logger.info(`${placement.getTile().getName()} produces ${this.getValue()} ${this.getStat()}`)
            player.incrementStat(this.getStat(), this.getValue())     
        }
        else {
            let allPlayers = gameState.getPlayers()

            switch (condition.type) {
                case (TileConfig.CONDITION.ADJACENT):
                    let neighbors = board.getAdjacentPlacements(placement)
                    for (let neighbor of neighbors) {
                        let tile = neighbor.getTile()

                        if (tile.meetsCondition(condition)) {
                            Logger.info(`${placement.getTile().getName()} next to ${tile.getName()} produces ${this.getValue()} ${this.getStat()}`)
                            player.incrementStat(this.getStat(), this.getValue())     
                        }
                    }
                    break
                case (TileConfig.CONDITION.EVERY):
                    let allPlacements = _.map(allPlayers, (player) => {
                        return player.getBoard().getPlacements()
                    })

                    for (let placementSet of allPlacements) {
                        for (let placement of placementSet) {
                            if (placement.getTile().meetsCondition(condition)) {
                                Logger.info(`${placement.getTile().getName()} because of ${tile.getName()} produces ${this.getValue()} ${this.getStat()}`)
                                player.incrementStat(this.getStat(), this.getValue())     
                            }
                        }
                    }
                    break
                case (TileConfig.CONDITION.OTHER):
                    let opponents = gameState.opponentsOf(player)
                    let otherPlacements = _.map(opponents, (opponent) => {
                        return opponent.getPlacements()
                    })

                    for (let placementSet of otherPlacements) {
                        for (let placement of placementSet) {
                            if (placement.getTile().meetsCondition(condition)) {
                                player.incrementStat(this.getStat(), this.getValue())     
                            }                        
                        }
                    }
                    break
                case (TileConfig.CONDITION.YOUR):
                    let yourPlacements = board.getPlacements()
                    for (let placement of yourPlacements) {
                        if (placement.getTile().meetsCondition(condition)) {
                            player.incrementStat(this.getStat(), this.getValue())     
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
    }
}

module.exports = Effect