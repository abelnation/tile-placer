'use strict'

//
// Tile-spec
// Created by dpekar on 10/7/15.
//

const assert = require('chai').assert

const Tile = require('../../../../shared/models/game/Tile')

describe('Tile', () => {
    it('basic constructor', () => {
        let tileInfo = {
            name: 'Convenience Store',
            cost: 6,
            category: 'Commericial',
            icon: null,
            stage: 'a',
            immediateEffect: (player) => { player.income++},
            conditionalEffect: (player) => { }
        }

        let tile = new Tile(tileInfo)
        assert.equal('Tile', tile.type)
        assert.equal(tile.getCost(), 6)
    })

    it('reads tiles list from json file', () => {        
        const allTiles = Tile.allTiles()
    })
})
