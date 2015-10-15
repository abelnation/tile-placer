'use strict'

/*eslint-disable no-unused-vars */
//
// mixin-spec
// Created by aallison on 10/8/15.
//

const _ = require('underscore')
const assert = require('chai').assert

const Moveable = {
    getX() { return this.x },
    getY() { return this.y },
    setX(x) { this.x = x },
    setY(y) { this.y = y },
    setPos(x, y) {
        this.setX(x)
        this.setY(y)
    },
    move(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

const Nameable = {
    getName() {
        return this.name
    },
    setName(name) {
        this.name = name
        return this
    }
}

class MovingPerson {
    constructor(name, x, y) {
        this.name = name
        this.x = x
        this.y = y
    }
}
_.extend(MovingPerson.prototype, Moveable)
_.extend(MovingPerson.prototype, Nameable)

describe('mixins', () => {
    it('simple example', () => {
        const mp = new MovingPerson('abel', 0, 0)

        assert.equal('abel', mp.getName())
        assert.equal(0, mp.getX())
        assert.equal(0, mp.getY())

        mp.setName('dave')
        mp.move(1, 2)

        assert.equal('dave', mp.getName())
        assert.equal(1, mp.getX())
        assert.equal(2, mp.getY())
    })
})
