'use strict'

//
// Tile-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Tile = require('../../../../shared/models/game/Tile')

describe('Tile', () => {
    it('basic constructor', () => {
        let tile = new Tile()

        assert.equal('Tile', tile.type)
    })
})
