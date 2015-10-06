module.exports = function(grunt) {

    grunt.registerTask('lint', [
        'eslint',
    ]);

    grunt.registerTask('build', [
        // 'clean',
        'mustache_render',
        // 'webpack',
        // 'sass',
        // 'rsync:stage'
    ]);

    grunt.registerTask('docs', [

    ]);
};
