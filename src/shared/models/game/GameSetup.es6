// const BaseError = require('../error/BaseError')
const Player = require('./Player')
const Market = require('./Market')
const Tile = require ('./Tile')
// const GameState = require ('./GameState')
const _ = require('underscore')


const GameSetup = {
    // Set up players for the game
    setupPlayers(users) {
        const players = users.map( user => {
            return new Player(user)
        })
        this.set('players', players)        
    },

    // Setup basic & a, b, c tile piles
    setupTilePiles() {
        const tilePiles = this.chooseSetofTiles() // Choose a, b, c tiles randomly
        this.set('tilePiles', tilePiles)     
    },

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
            if(stage === 'basic') {
                for (let tile of tiles) {
                    result['basic'+tile.getCategory()] = []
                    for (let i = 0; i < GameSetup.BASIC_TILES_PER_PILE; i++) {
                        let tileCopy = Object.assign({}, tile)
                        result['basic'+tile.getCategory()].push(tileCopy)  // Add a copy of the tile
                    }                    
                }
            } 

            // Piles for stage a, b & c should be chosen randomly
            else {
                let tilePile = []
                for (let i = 0; i < GameSetup.TILES_PER_PILE; i++) {
                    let tile = tiles[Math.floor(Math.random()*tiles.length)]
                    let tileCopy = Object.assign({}, tile) 
                    tilePile.push(tileCopy)
                }
                result[stage] = tilePile
            }
        })        
        return result
    }

}

GameSetup.BASIC_TILES_PER_PILE = 4
GameSetup.TILES_PER_PILE = 12    

module.exports = GameSetup