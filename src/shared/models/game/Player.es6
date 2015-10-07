'use strict'

//
// Player
// Created by dpekar on 10/7/15.
//

const BaseModel = require('../BaseModel')

class Player extends BaseModel {
    constructor(user) {
        super()
        this.set('user', user)

        this.set('income', 0)
        this.set('money', 15)

        this.set('reputation', 0)
        this.set('population', 0)

        this.set('board', [])
        this.set('goals', [])

        this.set('startingPlayer', false)
        this.set('turnsComplete', 0)
    }

    getUser() { return this.get('user') }

    getIncome() { return this.get('income') }
    getMoney() { return this.get('money') }

    getReputation() { return this.get('reputation') }
    getPopulation() { return this.get('population') }

    getBoard() { return this.get('board') }
    getGoals() { return this.get('goals') }

    isStartingPlayer() { return this.get('startingPlayer') }
    getTurnsComplete() { return this.get('turnsComplete') }
}
module.exports = Player