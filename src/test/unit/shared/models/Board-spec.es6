'use strict'

//
// Board-spec
// Created by dpekar on 10/9/15.
//

const assert = require('chai').assert
// const Logger = require('../../../../shared/log/Logger')

const Board = require('../../../../shared/models/game/Board')
const Tile = require('../../../../shared/models/game/Tile')
const Placement = require('../../../../shared/models/game/Placement')
// const TileConfig = require('../../../../shared/data/Tile-config')

describe('Board', () => {
    let tile = Tile.basicTiles()[0]

    it('basic constructor', () => {
        let board = new Board()        
        assert.equal('Board', board.type)
    })

    it('.addPlacements adds a placement to the board & getPlacements returns placements', () => {        
        let board = new Board()        
        let placement = new Placement(tile, [0,0], 1)
        board.addPlacement(placement)
        assert.equal(board.getPlacements()[0], placement)
    })

    it('.numPlacements returns count of how many placements are in board', () => {
        let board = new Board()        
        let placement = new Placement(tile, [0,0], 1)
        board.addPlacement(placement)
        assert.equal(board.numPlacements(), 1)
    })

    describe('.canPlaceOn', () => {
        let board = new Board()
        let placement = new Placement(tile, [0,0], 1)
        board.addPlacement(placement)

        it('returns false when trying to place tile on occupied space', () => {
            assert.isFalse(board.canPlaceOn([0,0]))
        })

        it('returns false when trying to place tile without any neighbors', () => {
             assert.isFalse(board.canPlaceOn([3,0]))              
        })

        it('returns true when placing in an unoccupied space with neighbors', () => {
            assert.isTrue(board.canPlaceOn([1,1]))              
        })
    })

    describe('.coordsOccupied', () => {
        let board = new Board()        
        let coords = [0,0]

        it('returns true if the coordinates already have a placement', () => {
            assert.isFalse(board.coordsOccupied(coords))
        })

        it('returns false if the coordinates have placement', () => {
            let placement = new Placement(tile, coords, 1)
            board.addPlacement(placement)      
            assert.isTrue(board.coordsOccupied(coords))
        })      
    })

    describe('.getAdjacent', () => {

        it('returns any placements adjacent to the one passed in', () => {
            let board = new Board()
            let placement = new Placement(tile, [0,0], 1)
            board.addPlacement(placement)
            assert.lengthOf(board.getAdjacent(placement), 0)
            
            let secondPlacement = new Placement(tile, [1,0], 2)
            board.addPlacement(secondPlacement)
            assert.lengthOf(board.getAdjacent(placement), 1)
            assert.equal(board.getAdjacent(placement)[0], secondPlacement)
            
            let thirdPlacement = new Placement(tile, [0,1], 3)
            board.addPlacement(thirdPlacement)
            assert.lengthOf(board.getAdjacent(placement), 2)  // original palcement is neighbors with both new placements

            assert.lengthOf(board.getAdjacent(secondPlacement), 1) // these two aren't neighbors with each other 
            assert.lengthOf(board.getAdjacent(thirdPlacement), 1) // these two aren't neighbors with each other
        })
          
    })

    describe('.atLeastOneAdjacent', () => {
        let board = new Board() 
        let startingPlacement = new Placement(tile, [0,0], 1)
        board.addPlacement(startingPlacement)

        it('returns true if there is a tile which has already been placed at neighboring coords', () => {
            let neighboringCoords = [1,1]
            assert.isTrue(board.atLeastOneAdjacent(neighboringCoords))
        })

        it('returns false if there is no placement at neighboring coords', () => {
            let nonNeighboringCoords = [2,0]
            assert.isFalse(board.atLeastOneAdjacent(nonNeighboringCoords))
        })

        it('returns true given a chain a placements', () => {
            let secondPlacement = new Placement(tile, [1,1], 1)
            board.addPlacement(secondPlacement)
            let newlyNeighboringCoords = [2,0]
            assert.isTrue(board.atLeastOneAdjacent(newlyNeighboringCoords))
        })
    })

    describe('.adjacentCoords returns an array of possible neighboring coordinates', () => {

        it('handles the case where column is odd properly', () => {
            let coords = [1, 1]
            let expectedNeighbors = [[0,0], [0,1], [1,0], [1,2], [2,0], [2,1]]

            const adjacentCoords = Board.adjacentCoords(coords)
            assert.deepEqual(adjacentCoords, expectedNeighbors)            
        })

        it('handles the case where column is even', () => {
            let coords = [2, 1]
            let expectedNeighbors = [[1,1], [1,2], [2,0], [2,2], [3,1], [3,2]]

            const adjacentCoords = Board.adjacentCoords(coords)
            assert.deepEqual(adjacentCoords, expectedNeighbors)            
        })

    })
})
