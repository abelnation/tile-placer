'use strict'

/*eslint-disable no-unused-vars */
//
// objectsAsKeys-spec
// Created by aallison on 10/7/15.
//

const assert = require('chai').assert

describe('objectsAsKeys', () => {
    it('using ints as keys', () => {
        const x = {
            1: 'one',
            2: 'two',
            3: 'three'
        }

        assert.equal('one', x[1])
        assert.equal('two', x[2])
        assert.equal('three', x[3])
    })

    it('using arrays as keys', () => {
        const x = {}
        x[[1,2,3]] = 'onetwothree'
        assert.equal('onetwothree', x[[1,2,3]])
    })

    it('using a class object as a key', () => {
        class Foo {
            constructor(x) {
                this.x = x
            }
            doFoo() { return this.x }
        }
        var x = {}
        x[new Foo(1)] = 'onefoo'

        assert.equal('onefoo', x[new Foo(1)])
    })
})
