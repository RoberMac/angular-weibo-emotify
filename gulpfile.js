const path    = require('path');
const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const concat  = require('gulp-concat');

const ROOT_PATH = path.resolve(__dirname);

// Minify JavaScript
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const NG_PATH = path.resolve(ROOT_PATH, 'src/angular-weibo-emotify.js');
gulp.task('js', function() {
    return gulp.src(NG_PATH)
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(uglify({preserveComments: 'some'}))
            .pipe(concat('angular-weibo-emotify.min.js'))
            .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

// Minify JSON
const jsonminify = require('gulp-jsonminify');
const EMOTIONS_PATH = path.resolve(ROOT_PATH, 'src/emotions_v2.json');
gulp.task('json', function () {
    return gulp.src(EMOTIONS_PATH)
        .pipe(jsonminify())
        .pipe(concat('emotions_v2.min.json'))
        .pipe(gulp.dest('dist'));
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
    gulp.watch(NG_PATH, ['js']);
    gulp.watch(EMOTIONS_PATH, ['json']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch' , 'js', 'json']);