'use strict';

//
// index.js
// Created by aallison on 9/30/15.
//

require('babel/register')

var Constants = require('./Constants')
var app = require('./app')

var PORT = Constants.HTTP_SERVER_PORT
app.listen(PORT, function() {
    console.log("Game server listening on " + PORT)
})
