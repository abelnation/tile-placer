'use strict'

//
// GameState
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')
// const BaseError = require('../error/BaseError')
const Player = require ('./Player')
// const Tile = require ('./Tile')

class GameState extends BaseModel {
    constructor(users) {
        super()
        this.init(users)
    }

    init(users) {

        // Set up players for the game
        let players = users.map( user => {
            return new Player(user)
        })
        this.set('players', players)

        // Set up initial tiles for players


        // Choose game tiles for the game 


        // Lay out market


        return this
    }

    getPlayers() {return this.get('players')}

}
module.exports = GameState
