var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var config = {
    jsFiles: ['*.js', 'src/**/*.js'],
    htmlFiles: './src/views/*.html',
    destHtml: './src/views',
    bowerJsFiles: './public/lib'
};

gulp.task('style', function () {
    return gulp.src(config.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: config.bowerJsFiles,
        ignorePath: '../../public'
    };
    return gulp.src(config.htmlFiles)
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.destHtml));
});
