'use strict';

//
// wallaby
// Created by aallison on 10/14/15.
//

var babel = require('babel');

module.exports = function(wallaby) {
    return {
        files: [
            'src/servers/**/*.es6',
            'src/shared/**/*.es6',
            'src/test/fixtures/**/*.es6',
            'src/test/util/*.es6',
            'src/test/util/**/*.es6',
        ],
        tests: [
            'src/test/unit/**/*-spec.js',
            'src/test/functional/**/*-spec.js',
            'src/test/unit/**/*-spec.jsx',
            'src/test/functional/**/*-spec.jsx',
            'src/test/unit/**/*-spec.es6',
            'src/test/functional/**/*-spec.es6'
        ],
        testFramework: 'mocha',

        compilers: {
            '**/*.es6': wallaby.compilers.babel({
                babel: babel,
                // other babel options
                stage: 0    // https://babeljs.io/docs/usage/experimental/
            })
        },

        env: {
            type: 'node',
            runner: 'node'
        }
    }
}
