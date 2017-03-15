var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('pug', function() {
  gulp.src('src/pug/**/*.pug')
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  gulp.src('src/sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream());
});

gulp.task('babel', function() {
  gulp.src('src/es6/**/*.es6')
  .pipe(plumber())
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream());
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'build',
      index: 'index.html',
      directory: false
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/es6/**/*.es6', ['babel']);
});

gulp.task('default', ['watch', 'server']);
