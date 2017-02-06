var gulp = require('gulp');
var config = require('../config');
var runSequence = require('run-sequence');

gulp.task('build:d', function (callback) {
    runSequence(
        [ 'jshint' ],
        [ 'less:theme', 'less:vendor', 'copy:build' ],
        [
            'cssmin:vendor',
            'cssmin:theme',
            'browserify:main',
            'concat:dist',
            'swig:dist'
        ],
        [ 'uglify:main', 'uglify:theme', 'prettify:theme' ],
        callback);
});

gulp.task('build:choose', function (callback) {
    runSequence(
        'build:d',
        'rename',
        callback);
});

gulp.task('build:dm', function (callback) {
    runSequence(
        [ 'jshint' ],
        [ 'less:theme', 'less:vendor', 'less:modules', 'copy:build' ],
        [
            'cssmin:vendor',
            'cssmin:theme',
            'cssmin:modules',
            'browserify:modules',
            'concat:dist',
            'concat:modules',
            'swig:dist'
        ],
        [ 'uglify:main', 'uglify:theme', 'uglify:modules', 'prettify:theme' ],
        callback);
});