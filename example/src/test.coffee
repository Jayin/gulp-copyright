gulp = require 'gulp'
coffee = require 'gulp-coffee'


gulp.task 'compile', ->
    gulp.src 'src/**/*.coffee'
        .pipe coffee()
        .pipe gulp.dest('./lib')

gulp.task 'example', ['compile'], ->
    copyright = require './lib/index'
    gulp.src './example/src/**/*.js'
        .pipe copyright
                owner: 'Jack Tang'
                license: 'Apache'
                year: 2014
        .pipe gulp.dest('example/dest')

    gulp.src './example/src/**/*.coffee'
        .pipe copyright
                owner: 'Jack Tang'
                license: 'MIT'
                year: 2015
        .pipe gulp.dest('example/dest')

gulp.task 'default', ['example']