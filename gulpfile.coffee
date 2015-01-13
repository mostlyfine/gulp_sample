gulp     = require "gulp"
coffee   = require "gulp-coffee"
sass     = require "gulp-sass"
less     = require "gulp-less"
uglify   = require "gulp-uglify"
cssmin   = require "gulp-cssmin"
imagemin = require "gulp-imagemin"
rename   = require "gulp-rename"
concat   = require "gulp-concat"
del      = require "del"
bower    = require "main-bower-files"

gulp.task "bower", ->
  gulp.src bower()
    .pipe gulp.dest "public/javascripts/vendor"

gulp.task "coffee", ->
  gulp.src "public/coffee/**/*.coffee"
    .pipe coffee()
    .pipe gulp.dest "public/javascripts"

gulp.task "sass", ->
  gulp.src "public/scss/**/*.scss"
    .pipe sass {outputStyle: "compressed"}
    .pipe gulp.dest "public/stylesheets"

gulp.task "less", ->
  gulp.src "public/less/**/*.less"
    .pipe less()
    .pipe gulp.dest "public/stylesheets"

gulp.task "image", ->
  gulp.src "public/images/**/*.png"
    .pipe imagemin()
    .pipe gulp.dest "build/images"

gulp.task "js", ->
  gulp.src "public/javascripts/**/*.js"
    .pipe uglify()
    .pipe rename {suffix: ".min"}
    .pipe gulp.dest "build/javascripts"
    .pipe concat "application.js"
    .pipe gulp.dest "build/javascripts"

gulp.task "css", ->
  gulp.src "public/stylesheets/**/*.css"
    .pipe cssmin()
    .pipe rename {suffix: ".min"}
    .pipe gulp.dest "build/stylesheets"
    .pipe concat "application.css"
    .pipe gulp.dest "build/stylesheets"

gulp.task "watch", ->
  gulp.watch "public/coffee/**", ["coffee"]
  gulp.watch "public/scss/**", ["sass"]
  gulp.watch "public/less/**", ["less"]
  gulp.watch "public/javascripts/**", ["js"]
  gulp.watch "public/stylesheets/**", ["css"]
  gulp.watch "public/images/**", ["image"]

gulp.task "clean", (cb)->
  del ["build", "dist"], cb

gulp.task "default", ["coffee", "less", "sass", "bower", "js", "css", "image"]
