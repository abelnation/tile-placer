module.exports = function(grunt) {
    return {
        options: {
            sourceMap: true,
            configFile: '.eslintrc',
        },

        webclient: [
            '<%= paths.webclient %>/*.{es6,jsx}',
            '<%= paths.webclient %>/**/*.{es6,jsx}',
            '!<%= paths.webclient %>/js/**'
        ],

        cli: [
            '<%= paths.cli %>/*.{es6,jsx}',
            '<%= paths.cli %>/**/*.{es6,jsx}',
        ],

        server: [
            '<%= paths.servers %>/*.{es6,jsx}',
            '<%= paths.servers %>/**/*.{es6,jsx}',
        ],

        shared: [
            '<%= paths.shared %>/*.{es6,jsx}',
            '<%= paths.shared %>/**/*.{es6,jsx}',
        ],

        test: [
            '<%= paths.src %>/test/*.{es6,jsx}',
            '<%= paths.src %>/test/**/*.{es6,jsx}'
        ],
    };
}
