var gulp = require('gulp')
var browserify = require('browserify')
var babel = require('gulp-babel')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync')
var concat = require("gulp-concat")
var sourcemaps = require('gulp-sourcemaps')
var open = require('gulp-open')

gulp.task('scripts', function() {
  browserify('src/public/scripts/main.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/scripts'))
})

gulp.task('open', function() {
  gulp.src('index.html')
    .pipe(open())
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['scripts'])
})

gulp.task('default', ['watch', 'scripts'])
