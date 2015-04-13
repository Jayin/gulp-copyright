### gulp-copyright
> Add the copyright in you source file.

### install

```shell
$ npm install --save-dev gulp-copyright2
```

### Usage

```javascript
gulp = require 'gulp'
coffee = require 'gulp-coffee'
copyright = require './lib/index'


gulp.task 'example', ->

    gulp.src ['./example/src/**/*.coffee']
        .pipe coffee()
        .pipe copyright
                owner: 'Jack Tang'
                license: 'Apache'
                year: 2014
        .pipe gulp.dest('example/dest')
    
    gulp.src ['./example/src/**/*.js','./example/src/**/*.css']
        .pipe copyright
                owner: 'Jack Tang'
                license: 'MIT'
                year: 2015
        .pipe gulp.dest('example/dest')


gulp.task 'default', ['example']
```