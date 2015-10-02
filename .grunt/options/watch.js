module.exports = function(grunt) {
    return {

        clientsrc: {
            files: [
                '<%= eslint.clientsrc %>'
            ],
            tasks: [
                'lint',
                // TODO: (aallison) webpack options
                'test',
            ]
        },

        serversrc: {
            files: [
                '<%= eslint.serversrc %>'
            ],
            tasks: [
                'lint',
                'test',
            ]
        },

        shared: {
            files: [
                '<%= eslint.shared %>'
            ],
            tasks: [
                'lint',
                'mustache_render', // generate ModelManager.es6 file
                'test',
            ]
        },

        tests: {
            files: [
                '<%= eslint.test %>'
            ],
            tasks: [
                'lint',
                'test',
            ]
        }
    };
};
