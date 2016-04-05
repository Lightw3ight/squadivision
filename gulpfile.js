'use strict';
var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('startWebServer', function () {
    nodemon({
        script: 'server/app.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    });
});
