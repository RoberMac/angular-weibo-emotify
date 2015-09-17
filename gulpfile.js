var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    jsonminify = require('gulp-jsonminify');
 

var paths = {
    js: ['dist/angular-weibo-emotify.js'],
    json: ['dist/emotions_v1.json']
};


// Minify JavaScript
gulp.task('js', function() {

    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(uglify({preserveComments: 'some'}))
            .pipe(concat('angular-weibo-emotify.min.js'))
            .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

// Minify JSON
gulp.task('json', function () {
    return gulp.src(paths.json)
        .pipe(jsonminify())
        .pipe(concat('emotions_v1.min.json'))
        .pipe(gulp.dest('dist'));
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.json, ['json']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch' , 'js', 'json']);