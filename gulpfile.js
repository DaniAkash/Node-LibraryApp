var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var config = {
    jsFiles: ['*.js', 'src/**/*.js'],
    htmlFiles: './src/views/*.html',
    destHtml: './src/views',
    bowerJsFiles: './public/lib',
    bowerOptions: {
        bowerJson: require('./bower.json'),
        directory: this.bowerJsFiles,
        ignorePath: '../../public'
    },
    gulpInjectSrc: gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false}),
    gulpInjectOptions: {
        ignorePath: '/public'
    },
    nodemonOptions: {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: this.jsFiles
    }
};

gulp.task('style', function () {
    return gulp.src(config.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    return gulp.src(config.htmlFiles)
        .pipe(wiredep(config.bowerOptions))
        .pipe(inject(config.gulpInjectSrc, config.gulpInjectOptions))
        .pipe(gulp.dest(config.destHtml));
});

gulp.task('serve', ['style','inject'], function() {
    return nodemon(config.nodemonOptions)
        .on('restart', function(ev) {
            console.log('Restarting....');
        });
});

gulp.task('default', ['serve']);
