'use strict'

//
// simple_nested_01
// Created by aallison on 9/30/15.
//

module.exports = {
    type: 'BaseModel',
    data: {
        key1: 'val1',
        obj: {
            a: 1,
            b: 'two',
            c: [ 1, 2, 3 ],
            d: { type: 'BaseModel', data: { nestKeya: 'nestVala' } },
            e: {
                a: {
                    type: 'BaseModel', data: {
                        a: 'a',
                        nested: { type: 'BaseModel', data: { nestKeya: 'nestVala' } },
                        c: [ 1, 2, 3 ]
                    }
                },
                b: 'b'
            }
        },
        arr: [
            1,
            'two',
            {
                type: 'BaseModel',
                data: {
                    nestKeya: 'nestVala',
                }
            }
        ],
        nested: {
            a: {
                type: 'BaseModel',
                data: {
                    nestKeya: 'nestVala',
                }
            },
            b: {
                type: 'BaseModel',
                data: {
                    nestKeyb: 'nestValb',
                }
            }
        }

    }
}
