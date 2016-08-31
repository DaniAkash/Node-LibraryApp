var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var config = {
    jsFiles: ['*.js', 'src/**/*.js']
};

gulp.task('style', function () {
    return gulp.src(config.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish',{
            verbose: true
        }))
        .pipe(jscs());
});
