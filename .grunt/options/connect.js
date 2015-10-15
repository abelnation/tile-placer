'use strict';

//
// connect
// Created by aallison on 10/10/15.
//

module.exports = function(grunt) {
    return {
        webclient: {
            options: {
                port: 6969,
                base: '<%= paths.webclient %>',
                open: true,
                keepalive: true,
            }
        }
    }
}
