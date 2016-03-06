var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('jade', function() {
  gulp.src('./jade/**/*.jade')
  .pipe(plumber())
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest('./public'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  gulp.src('./sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(gulp.dest('./public/css'))
  .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
  gulp.src('./coffee/**/*.coffee')
  .pipe(plumber())
  .pipe(coffee())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'))
  .pipe(browserSync.stream());
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./coffee/**/*.coffee', ['coffee']);
});

gulp.task('default', ['watch', 'server']);