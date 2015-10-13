'use strict'

//
// Effect
// Created by dpekar on 10/12/15.
//

const _ = require('underscore')
// const Logger = require('../../log/Logger')

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

    executeOn(player, placement, gameState) {
        let condition = this.getCondition()
        let board = player.getBoard()

        if (_.isUndefined(condition)) {
            player.incrementStat(this.getStat(), this.getValue())     
        }
        else {
            let allPlayers = gameState.getPlayers()

            switch (condition.type) {
                case (TileConfig.CONDITION.ADJACENT):
                    let neighbors = board.getAdjacent(placement)
                    for (let neighbor of neighbors) {
                        let tile = neighbor.getTile()

                        if (tile.meetsCondition(condition)) {
                            player.incrementStat(this.getStat(), this.getValue())     
                        }
                    }
                    break
                case (TileConfig.CONDITION.EVERY):
                    let allPlacements = _.map(allPlayers, (player) => {
                        return player.getPlacements()
                    })

                    for (let placementSet of allPlacements) {
                        for (let placement of placementSet) {
                            if (placement.getTile().meetsCondition(condition)) {
                                player.incrementStat(this.getStat(), this.getValue())     
                            }
                        }
                    }
                    break
                case (TileConfig.CONDITION.OTHER):
                    let otherPlayers = _.filter(allPlayers, (playerX) => {
                        playerX !== player                        
                    })
                    let otherPlacements = _.map(otherPlayers, (playerX) => {
                        return playerX.getPlacements()
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
                    let yourPlacements = player.getPlacements()
                    for (let placement of yourPlacements) {
                        if (placement.getTile().meetsCondition(condition)) {
                            player.incrementStat(this.getStat(), this.getValue())     
                        }
                    }
                    break
                case (TileConfig.CONDITION.AFTER):
                    break
                default:  // There is no condition specified
                    break
           }
        }
    }
}

module.exports = Effect