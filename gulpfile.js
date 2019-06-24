"use strict";

// npm install npm-install-all
// npm-install-all gulpfile.js

var gulp = require('gulp'),
    sass = require('gulp-sass'), //enables compiling of scss files
    compass = require('compass-importer'),
    cssGlobbing = require('gulp-css-globbing'), //enables globbing imports
    jshint = require('jshint'),
    gulpjshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    webserver = require('gulp-webserver');

var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var cssnext = require('gulp-cssnext');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var pixrem = require('pixrem')
var sassVars = require('gulp-sass-vars');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

var notifyInfo = {
    title: 'Gulp'
};

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};


gulp.task('sass', function() {
    gulp.src('./templateAssets/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: compass
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./templateAssets/scss/'));
});

gulp.task('sassecho', function() {
    gulp.src('./templateAssetsEcho24/css/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: compass
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./templateAssetsEcho24/css/'));
});

gulp.task('css', function() {
    var processors = [
        cssImport,
        mixins,
        simpleVars,
        nested,
        autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }),
        mqpacker,
        pixrem,
        cssnano
    ];
    gulp.src('./templateAssets/scss/*.css')
        .pipe(plumber())
        .pipe(cssGlobbing())
        .pipe(postcss(processors))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./templateAssets/css/'))
        .pipe(reload({ stream: true }));
});

gulp.task('cssecho', function() {
    var processors = [
        cssImport,
        mixins,
        simpleVars,
        nested,
        autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }),
        mqpacker,
        pixrem,
        cssnano
    ];
    gulp.src('./templateAssetsEcho24/css/*.css')
        .pipe(plumber())
        .pipe(cssGlobbing())
        .pipe(postcss(processors))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./templateAssetsEcho24/echocss/'))
        .pipe(reload({ stream: true }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Webserver
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(plumber())
        .pipe(webserver({
            livereload: true,
            directoryListing: false, // if set to true, shows list
            open: true,
            port: 8001
        }));
});

// Concatenate & Minify

// Concatenate & Minify
gulp.task('scripts', function() {
    gulp.src('./templateAssets/js/source/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('./templateAssets/js/app.js'))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '-min.js'
            }
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
        .pipe(reload({ stream: true }));
});

// Watch
gulp.task('watch', ['webserver'], function() {
    gulp.watch('./templateAssets/scss/**/*.scss', ['sass', 'css']);

    gulp.watch(['./templateAssets/js/source/**/*.js', '!./templateAssets/js/**/app.js'], ['scripts']);
});

gulp.task('watchecho', ['webserver'], function() {
    gulp.watch('./templateAssetsEcho24/css/**/*.scss', ['sassecho', 'cssecho']);
});

gulp.task('default', ['sass', 'css', 'scripts']);

gulp.task('styles', ['sass', 'css']);
