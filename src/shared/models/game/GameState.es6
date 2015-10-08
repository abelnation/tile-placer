'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
// const BaseError = require('../error/BaseError')
const Logger = require('../../log/Logger')
const Player = require ('./Player')
const Tile = require ('./Tile')
const _ = require('underscore')

class GameState extends BaseModel {

    constructor(users) {
        super()
        this.init(users)
    }

    init(users) {
        this.setupPlayers(users)
        this.setupTilePiles()
        this.setupStartingTilesForPlayers()        
        this.setupMarket()        
        return this
    }

    getPlayers() {return this.get('players')}
    getTilePiles() {return this.get('tilePiles')}

    // Set up players for the game
    setupPlayers(users) {
        const players = users.map( user => {
            return new Player(user)
        })
        this.set('players', players)        
    }

    // Setup basic & a, b, c tile piles
    setupTilePiles() {
        const tiles = this.chooseSetofTiles() // Choose a, b, c tiles randomly
        this.set('tilePiles', tiles)         
    }

    // Place 3 basic tiles on each players' board
    setupStartingTilesForPlayers() {
        // Set up starting tiles for players
        let players = this.getPlayers()
        const xCoord = 0
        for (let player of players) {
            let yCoord = 0    
            for (let tile of Tile.basicTiles()) {
                player.placeTile(tile, [xCoord, yCoord], 0)
                yCoord++
            }
        }

    }

    setupMarket() {

    }


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

GameState.BASIC_TILES_PER_PILE = 4
GameState.TILES_PER_PILE = 12  

module.exports = GameState
