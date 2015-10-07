'use strict'

/*eslint-disable no-unused-vars */
//
// BaseError-spec
// Created by aallison on 10/7/15.
//

const assert = require('chai').assert
const bluebird = require('bluebird')

const BaseError = require('../../../../shared/models/error/BaseError')

describe('BaseError', () => {
    it('basic constructor', () => {
        const message = 'test error'
        const e = new BaseError(message)

        assert.equal(message, e.getMessage())
        assert.include(e.getFileName(), 'BaseError-spec.es6')
        assert.isTrue(e instanceof BaseError)
    })

    it('subclasses are instanceof BaseError', () => {
        class ChildError extends BaseError {
            constructor() {
                super('child error')
            }
        }
        const e = new ChildError()
        assert.isTrue(e instanceof ChildError)
        assert.isTrue(e instanceof BaseError)
    })

    it('works with bluebird promise catch predicates', (done) => {
        bluebird.resolve(1234).then(result => {
            throw new BaseError('test error')
        }).then(result => {
            done(new Error('should have jumped to catch handler'))
        }).catch(e => e instanceof BaseError, err => {
            done()
        }).catch(err => {
            done(new Error('should not have gotten to catch all error handler'))
        })
    })
})
