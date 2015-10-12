'use strict'

//
// Placement
// Created by dpekar on 10/9/15.
//

const _ = require('underscore')

const BaseModel = require('../BaseModel')
// const Placement = require('./Placement')

const Logger = require('../../log/Logger')

class Board extends BaseModel {
    constructor() {
        super()
        this.set('placements', [])
    }

    getPlacements() { return this.get('placements') }

    numPlacements() { return this.getPlacements().length }

    addPlacement(placement) {
        let coords = placement.getCoords()
        let placements = this.getPlacements()      
        let startingTilePosition = _.isEqual(coords, [0,0])

        if (!this.coordsOccupied(coords) && startingTilePosition) {
            placements.push(placement) // Special case when placing first tile during setup
            Logger.info('Placed starting tile')
        }
        else if (this.canPlaceOn(coords)) {
            placements.push(placement)
            Logger.info('Placed a new tile')
         }
        else {
            Logger.info('Couldn\'t place tile')
        }
        this.set('placements', placements)

        return true
    }

    canPlaceOn(coords) {
        return !this.coordsOccupied(coords) && this.atLeastOneAdjacent(coords)
    }

    atLeastOneAdjacent(coords) {
        const placements = this.getPlacements()
        const possibleNeighbors = Board.possibleNeighbors(coords)

        return _.some(placements, (placement) => {
            return _.some(possibleNeighbors, (possibleNeighbor) => {
                return _.isEqual(placement.getCoords(), possibleNeighbor)
            })
        })        
    } 

    coordsOccupied(coords) {
        const placements = this.getPlacements()

        if(_.isEmpty(placements)) {
            return false
        }

        return _.some(placements, (placement) => {
            return _.isEqual(placement.getCoords(), coords)
        })
    }

    static possibleNeighbors(coords) {
        let xCoord = coords[0]
        let yCoord = coords[1]

        // Odd and Even columns are slightly different
        if (xCoord % 2 === 0) {         // Even case
            return [
                [xCoord-1, yCoord],     // Different from odd 
                [xCoord-1, yCoord+1],   // Different from odd 
                [xCoord, yCoord-1],     
                [xCoord, yCoord+1],     
                [xCoord+1, yCoord],     // Different from odd 
                [xCoord+1, yCoord+1]    // Different from odd
            ]            
        } else {                        // Odd case
            return [
                [xCoord-1, yCoord-1],
                [xCoord-1, yCoord],
                [xCoord, yCoord-1],
                [xCoord, yCoord+1],
                [xCoord+1, yCoord-1],
                [xCoord+1, yCoord]
            ]            
        }
    }
}

module.exports = Board