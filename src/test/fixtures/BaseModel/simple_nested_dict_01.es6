'use strict'

//
// simple_nested_01
// Created by aallison on 9/30/15.
//

module.exports = {
    type: 'BaseModel',
    data: {
        key1: 'val1',
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
            },
        }
    }
}
