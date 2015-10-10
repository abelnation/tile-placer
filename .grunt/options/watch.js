module.exports = function(grunt) {
    return {

        webclient: {
            files: [ '<%= eslint.webclient %>' ],
            tasks: [
                'lint',
                'webpack',
                'test',
            ]
        },

        cli: {
            files: [ '<%= eslint.cli %>' ],
            tasks: [
                'lint',
                'test'
            ]
        },

        server: {
            files: [ '<%= eslint.server %>' ],
            tasks: [
                'lint',
                'test',
            ]
        },

        shared: {
            files: [ '<%= eslint.shared %>' ],
            tasks: [
                'lint',
                'mustache_render', // generate ModelManager.es6 file
                'webpack',
                'test',
            ]
        },

        tests: {
            files: [ '<%= eslint.test %>' ],
            tasks: [
                'lint',
                'test',
            ]
        }
    };
};
