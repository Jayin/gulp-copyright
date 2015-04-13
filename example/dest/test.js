/**
 * Copyright 2014 Jack Tang
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 **/

(function() {
  var coffee, gulp;

  gulp = require('gulp');

  coffee = require('gulp-coffee');

  gulp.task('compile', function() {
    return gulp.src('src/**/*.coffee').pipe(coffee()).pipe(gulp.dest('./lib'));
  });

  gulp.task('example', ['compile'], function() {
    var copyright;
    copyright = require('./lib/index');
    gulp.src('./example/src/**/*.js').pipe(copyright({
      owner: 'Jack Tang',
      license: 'Apache',
      year: 2014
    })).pipe(gulp.dest('example/dest'));
    return gulp.src('./example/src/**/*.coffee').pipe(copyright({
      owner: 'Jack Tang',
      license: 'MIT',
      year: 2015
    })).pipe(gulp.dest('example/dest'));
  });

  gulp.task('default', ['example']);

}).call(this);
