module.exports = function(grunt) {

    grunt.registerTask('lint', [
        'eslint',
    ]);

    grunt.registerTask('build', [
        'clean',
        'lint',
        'webpack',
        'sass',
        'rsync:stage'
    ]);

    grunt.registerTask('docs', [

    ]);
};
