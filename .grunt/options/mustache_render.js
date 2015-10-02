'use strict';

//
// mustache_render
// Created by aallison on 10/2/15.
//

var glob = require('glob')

module.exports = function(grunt) {

    // recursively load files in models dir
    var modelFiles = glob.sync('./src/shared/models/**/*.{es6,js}')
        // make paths relative to the models dir
        .map(function(filePath) {
            return filePath.replace('./src/shared/models/', './')
        })
        // parse out modelname from filepath and create dict of model data
        .map(function(relativeModelPath) {
            var modelPathTokens = relativeModelPath.split('/')
            var modelName = modelPathTokens[modelPathTokens.length - 1].replace('.es6', '')
            return {
                relativePath: relativeModelPath,
                modelName: modelName
            }
        })
        .filter(function(model) {
            return (model.modelName !== 'BaseModel' &&
                model.modelName !== 'ModelManager')
        })
        // combine together into the string that will be added
        .reduce(function(agg, val) {
            if (agg) { agg += '\n' }
            return agg + ('    \'' + val.modelName + '\': require(\'' + val.relativePath + '\'),')
        }, '')

    return {
        options: {
            // Task global options go here
        },
        your_target: {
            options: {
                // Target specific options go here
            },
            files : [
                {
                    data: {
                        generated_models: modelFiles
                    },
                    template: './src/templates/ModelManager.es6.template',
                    dest: './src/shared/models/ModelManager.es6'
                }
            ]
        },
    }
}
