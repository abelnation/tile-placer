'use strict'

//
// GameSetup
// Created by dpekar on 10/7/15.
//

const Logger = require('../log/Logger')

// const BaseError = require('../error/BaseError')
const _ = require('underscore')
const Player = require('../models/game/Player')
const Market = require('../models/game/Market')
const Tile = require('../models/game/Tile')
const GameSetupConfig = require('../data/GameSetup-config')
const TileConfig = require('../data/Tile-config')

const GameSetup = {
    // Set up players for the game
    setupPlayers() {
        const users = this.getUsers()
        const players = users.map( user => new Player(user) )
        this.set('players', players)        

        // TOOD: Set starting player

    },

    // Setup basic & a, b, c tile piles
    setupTilePiles() {
        const tilePiles = this.chooseSetofTiles() // Choose a, b, c tiles randomly
        Logger.info("Tile in setup", typeof tilePiles['basicResidential'])
        this.set('tilePiles', tilePiles)
        let piles = this.getTilePiles()
        let pile = piles[0]
    },

    // Place 3 basic tiles on each players' board
    setupStartingTilesForPlayers() {
        // Set up starting tiles for players
        let players = this.getPlayers()
        const xCoord = 0
        
        for (let player of players) {
            let yCoord = 0    
            for (let tile of Tile.basicTiles()) {
                player.placeTile(tile, [xCoord, yCoord], this)
                yCoord++
            }
        }
    },

    // Draw tiles from a pile to fill up market
    setupMarket() {
        let tilePiles = this.getTilePiles()
        let market = new Market(tilePiles)
        this.set('market', market)
    },


    // Randomly selects tiles from Tile-list.json and puts them into piles for players to draw from
    chooseSetofTiles() {

        let allTiles = Tile.allTiles()

        let result = {}
        _.each(allTiles, (tiles, stage) => {
            // Each of the basic tiles gets its own pile 
            if(stage === TileConfig.BASIC) {
                for (let tile of tiles) {
                    result['basic'+tile.getCategory()] = []
                    for (let i = 0; i < GameSetupConfig.BASIC_TILES_PER_PILE; i++) {
                        let tileCopy = clone(tile)
                        result['basic'+tile.getCategory()].push(tileCopy)  // Add a copy of the tile
                    }                    
                }
            } 

            // Piles for stage a, b & c should be chosen randomly
            else if (stage !== TileConfig.LAKE ){
                let tilePile = []
                for (let i = 0; i < GameSetupConfig.TILES_PER_PILE; i++) {
                    let tile = tiles[Math.floor(Math.random()*tiles.length)]
                    let tileCopy = clone(tile)
                    tilePile.push(tileCopy)
                }
                result[stage] = tilePile
            }
        })        
        return result
    }

}

var clone = (function(){ 
  return function (obj) { Clone.prototype=obj; return new Clone() }
  function Clone(){}
}())

module.exports = GameSetup