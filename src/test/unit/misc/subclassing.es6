'use strict'

/*eslint-disable no-unused-vars */
//
// subclassing
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert

const BaseModel = require('../../../shared/models/BaseModel')
const BaseError = require('../../../shared/models/error/BaseError')

describe('subclassing', () => {

    it('instanceof works for subclasses of BaseModel', () => {
        const e = new BaseError('test error message')
        assert.isTrue(e instanceof BaseError)
        assert.isTrue(e instanceof BaseModel)
    })

    it('instanceof works for child and parent classes', () => {
        class Base {}
        class Child extends Base {}

        const b = new Base()
        const c = new Child()

        assert.isTrue(b instanceof Base)
        assert.isFalse(b instanceof Child)

        assert.isTrue(c instanceof Child)
        assert.isTrue(c instanceof Base)
    })
})

