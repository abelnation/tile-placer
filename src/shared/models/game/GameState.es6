'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
// const BaseError = require('../error/BaseError')
const Player = require ('./Player')
const Tile = require ('./Tile')
const _ = require('underscore')

class GameState extends BaseModel {

    constructor(users) {
        super()
        this.init(users)

        this.BASIC_TILES_PER_PILE = 4
        this.TILES_PER_PILE = 12  
    }

    init(users) {

        // Set up players for the game
        const players = users.map( user => {
            return new Player(user)
        })
        this.set('players', players)

        // Set up initial tiles for players


        // Choose game tiles for the game 
        const tiles = this.chooseSetofTiles()
        this.set('tilePiles', tiles)


        // Lay out market


        return this
    }

    getPlayers() {return this.get('players')}
    getTilePiles() {return this.get('tilePiles')}


    // Randomly selects tiles from Tile-list.json and puts them into piles for players to draw from
    chooseSetofTiles() {

        let allTiles = Tile.allTiles()

        let result = {}
        _.each(allTiles, (tiles, stage) => {
            // Each of the basic tiles gets its own pile 
            if(stage === 'basic') {
                for (let tile of tiles) {
                    result['basic'+tile.getCategory()] = []
                    for (let i = 0; i < GameState.BASIC_TILES_PER_PILE; i++) {
                        result['basic'+tile.getCategory()].push(Object.assign({}, tile))  // Add a copy of the tile
                    }                    
                }
            } 

            // Piles for stage a, b & c should be chosen randomly
            else {
                let tilePile = []
                for (let i = 0; i < GameState.TILES_PER_PILE; i++) {
                    tilePile.push(tiles[Math.floor(Math.random()*tiles.length)])
                }
                result[stage] = tilePile
            }
        })
        
        return result
    }

}
module.exports = GameState
