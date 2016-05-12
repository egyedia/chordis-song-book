// Include gulp & gulp plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer');


// Creating error handling exception using gulp-util
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

// Lint task
gulp.task('lint', function () {
  return gulp.src('app/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(connect.reload());
});

// Compile LESS files
gulp.task('less', function () {
  return gulp.src(['app/less/style.less'])
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'IE 9'],
        cascade : true
      }))
      .pipe(gulp.dest('app/css'))
      .pipe(connect.reload());
});

// Server
gulp.task('server', function () {
  connect.server({
    root      : 'app',
    port      : 2200,
    //livereload: true,
    fallback  : "app/index.html"
  });
});

// Html
gulp.task('html', function () {
  return gulp.src('/app/views/*.html')
      .pipe(connect.reload());
});

// Watch files for changes
gulp.task('watch', function () {
  gulp.watch('app/scripts/*.js', ['lint']);
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/views/*.html', ['html']);
});

// Default task
gulp.task('default', ['server', 'lint', 'less', 'watch']);

// Build task
//gulp.task('build', ['minifyCSS', 'htmlreplace', 'angular']);
