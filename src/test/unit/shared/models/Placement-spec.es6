'use strict'

//
// Placement-spec
// Created by dpekar on 10/8/15.
//

const assert = require('chai').assert

const Tile = require('../../../../shared/models/game/Tile')
const Placement = require('../../../../shared/models/game/Placement')

describe('Placement', () => {
    let tile = Tile.basicTiles()[0]
    let placement = new Placement(tile, [1,2],  3)
 
    it('basic constructor', () => {
        assert.equal('Placement', placement.type)

        assert.equal(placement.getTile(), tile)
        assert.equal(placement.getXCoord(), 1)
        assert.equal(placement.getYCoord(), 2)
        assert.deepEqual(placement.getCoords(), [1, 2])

    })
})
