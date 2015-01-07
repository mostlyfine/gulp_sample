var gulp     = require("gulp");
var coffee   = require("gulp-coffee");
var less     = require("gulp-less");
var sass     = require("gulp-sass");
var uglify   = require("gulp-uglify");
var cssmin   = require("gulp-cssmin");
var imagemin = require("gulp-imagemin");
var concat   = require("gulp-concat");
var rename   = require("gulp-rename");
var del      = require("del");

gulp.task("coffee", function() {
  gulp.src("public/coffee/**/*.coffee")
    .pipe(coffee())
    .pipe(gulp.dest("public/javascripts"));
});

gulp.task("less", function() {
  gulp.src("public/less/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("sass", function() {
  gulp.src("public/scss/**/*.scss")
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("image", function() {
  gulp.src("public/images/**/*.png")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("js", function() {
  gulp.src(["public/javascripts/**/*.js", "!public/javascripts/vendor/**"])
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/javascripts"))
    .pipe(concat("application.js"))
    .pipe(gulp.dest("dist/javascripts"));

  gulp.src("public/javascripts/vendor/**")
    .pipe(gulp.dest("dist/javascripts/vendor"));
});

gulp.task("css", function() {
  gulp.src(["public/stylesheets/**/*.css", "!public/stylesheets/vendor/**"])
    .pipe(cssmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/stylesheets"))
    .pipe(concat("application.css"))
    .pipe(gulp.dest("dist/stylesheets"));

  gulp.src("public/stylesheets/vendor/**")
    .pipe(gulp.dest("dist/stylesheets/vendor"));
});

gulp.task("clean", function(cb) {
  del(["build", "dist"], cb);
});

gulp.task("watch", function() {
  gulp.watch("public/coffee/**", ["coffee"]);
  gulp.watch("public/less/**", ["less"]);
  gulp.watch("public/scss/**", ["sass"]);
  gulp.watch("public/javascripts/**", ["js"]);
  gulp.watch("public/stylesheets/**", ["css"]);
  gulp.watch("public/images/**", ["image"]);
});

gulp.task("default", ["coffee", "less", "sass", "js", "css", "image"]);
