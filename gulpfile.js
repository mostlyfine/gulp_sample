var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('pug', function() {
  gulp.src('pug/**/*.pug')
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.stream());
});

gulp.task('babel', function() {
  gulp.src('es6/**/*.es6')
  .pipe(plumber())
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream());
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'public',
      index: 'index.html',
      directory: true
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('pug/**/*.pug', ['pug']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('es6/**/*.es6', ['babel']);
});

gulp.task('default', ['watch', 'server']);
