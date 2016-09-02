var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

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
