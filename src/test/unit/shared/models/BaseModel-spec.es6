'use strict'

/*eslint-disable no-unused-vars */
//
// BaseModel-spec
// Created by aallison on 9/30/15.
//

const assert = require('chai').assert
const assertJsonEqual = require('../../../util/json').assertJsonEqual

const ModelManager = require('../../../../shared/models/ModelManager')
const BaseModel = require('../../../../shared/models/BaseModel')

class ChildModel extends BaseModel {
    constructor() { super() }
    childMethod() {}
}
ModelManager.createModel('ChildModel', ChildModel)

describe('BaseModel', () => {

    describe('set', () => {
        it('sets value in data dict', () => {
            const m = new BaseModel()
            const key = 'key'
            const val = 'val'

            m.set(key, val)
            assert.equal(val, m.data[key])
        })
    })

    describe('get', () => {
        it('fetches values set on model', () => {
            const m = new BaseModel()
            const key = 'key'
            const val = 'val'

            m.set(key, val)
            assert.equal(val, m.get(key))
        })
    })

    describe('toJSON', () => {
        it('works for simple model', () => {
            const m = new BaseModel()
            const expected = {
                type: 'BaseModel',
                data: {
                    key1: 'val1',
                    key2: 'val2'
                }
            }

            m.set('key1', 'val1')
            m.set('key2', 'val2')

            assertJsonEqual(expected, m.toJSON())
        })
    })

    describe('fromJSON', () => {
        it('works for simple model', () => {
            const json = require('../../../fixtures/BaseModel/simple_01')
            const m = ModelManager.fromJSON(json)

            // assert data is the same
            assertJsonEqual(json, m.toJSON())

            // ensure BaseModel methods are there
            assert.isDefined(m.get)
            assert.isDefined(m.set)
        })

        it('works for nested models', () => {
            const json = require('../../../fixtures/BaseModel/simple_nested_01')
            const m = ModelManager.fromJSON(json)

            assertJsonEqual(json, m.toJSON())
            assert.isDefined(m.get)
            assert.isDefined(m.set)

            const nested = m.get('nested')
            assert.isDefined(nested.get)
            assert.isDefined(nested.set)
            assert.equal('nestVal1', nested.get('nestKey1'))
        })

        it('works for nested arrays containing models', () => {
            const json = require('../../../fixtures/BaseModel/simple_nested_array_01')
            const m = ModelManager.fromJSON(json)

            const nested = m.get('nested')
            const nested1 = nested[0]
            const nested2 = nested[1]

            assertJsonEqual(json, m.toJSON())
            assert.instanceOf(m, BaseModel)
            assert.instanceOf(nested1, BaseModel)
            assert.instanceOf(nested2, BaseModel)

            assert.equal('nestVal1', nested1.get('nestKey1'))
            assert.equal('nestVal2', nested2.get('nestKey2'))
        })

        it('works for nested objects containing models', () => {
            const json = require('../../../fixtures/BaseModel/simple_nested_dict_01')
            const m = ModelManager.fromJSON(json)

            const nested = m.get('nested')
            const nesteda = nested.a
            const nestedb = nested.b

            assertJsonEqual(json, m.toJSON())
            assert.instanceOf(m, BaseModel)
            assert.instanceOf(nesteda, BaseModel)
            assert.instanceOf(nestedb, BaseModel)

            assert.equal('nestVala', nesteda.get('nestKeya'))
            assert.equal('nestValb', nestedb.get('nestKeyb'))
        })

        it('works for complex nested objects, arrays, and models', () => {
            const json = require('../../../fixtures/BaseModel/complex_nested_01')
            const m = ModelManager.fromJSON(json)

            assertJsonEqual(json, m.toJSON())

            console.log(m)

            console.log(m.get('obj'))

            assert.instanceOf(m.get('obj').d, BaseModel)
            assert.instanceOf(m.get('obj').e.a, BaseModel)
            assert.instanceOf(m.get('obj').e.a.get('nested'), BaseModel)
            assert.equal('nestVala', m.get('obj').e.a.get('nested').get('nestKeya'), BaseModel)
            assert.instanceOf(m.get('arr')[2], BaseModel)
            assert.instanceOf(m.get('arr')[2], BaseModel)
            assert.instanceOf(m.get('nested').a, BaseModel)
            assert.instanceOf(m.get('nested').b, BaseModel)
        })

        it('works for nested subclasses of Base-model', () => {
            const json = require('../../../fixtures/BaseModel/nested_subclass_01')
            const m = ModelManager.fromJSON(json)

            assertJsonEqual(json, m.toJSON())
            assert.isDefined(m.get)
            assert.isDefined(m.set)

            const nested = m.get('nested')
            assert.isDefined(nested.get)
            assert.isDefined(nested.set)

            assert.equal('ChildModel', nested.type)
            assert.isDefined(nested.childMethod)
            assert.equal('nestVal1', nested.get('nestKey1'))
        })
    })

    describe('subclassing', () => {
        // TODO: (aallison) implement
    })
})
