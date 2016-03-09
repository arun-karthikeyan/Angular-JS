//I'm a strict officer :P
'use strict';

//loading all the dev plugins into gulp
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
cleancss = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
rev = require('gulp-rev'),
changed = require('gulp-changed'),
browserSync = require('browser-sync').create(),
del = require('del'),
reload = browserSync.reload,
gulpngannonate = require('gulp-ng-annotate'),
merge = require('merge-stream');

var runsequence = require('run-sequence').use(gulp);

//Gulp JS Hint task - JS Hint must run synchronously before clean, so if there is any error it has to stop right there
gulp.task('jshint', function(){
  return gulp.src('./app/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(stylish));
});

//Gulp Imagemin task
gulp.task('imagemin', function(){
  return gulp.src('./app/images/**/*')
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest('./dist/images/'))
  .pipe(notify({
    message: 'All Images Optimized',
    onLast: true
  }));
});

//Gulp clean up - mustn't happen asynchronously, so I'm not returning a stream
gulp.task('clean', ['jshint'], function(){
  return del(['dist']);
});

//Gulp usemin task - first method as described in the docs - weirdly throws an exception
// gulp.task('usemin', function(){
//   return gulp.src('app/*.html')
//   .pipe(usemin({
//     css: [cleancss(), rev()],
//     js: [uglify(), rev()],
//     html: [htmlmin({
//       collapseWhitespace: true
//     })],
//     inlinejs: [uglify()],
//     inlinecss: [cleancss()]
//   }))
//   .pipe(gulp.dest('dist/'));
// });

//Gulp usemin task - second method as described in the docs
gulp.task('usemin', function(){
  return gulp.src('./app/index.html')
  .pipe(usemin({
    css: [function() {return cleancss({
      keepSpecialComments: 0
    });},rev, 'concat'],
    //with uglify
    // js: [gulpngannonate, function() {
    //   return uglify({
    //     mangle: true
    //   });}, rev, 'concat'],
    //no uglify - for debugging purposes
    js: [gulpngannonate, rev, 'concat'],
      html: [ function() {return htmlmin({
        collapseWhitespace: true
      });}]
    }))
    .pipe(gulp.dest('./dist/'));
  });

  //Gulp viewsmin task - to minify and distribute the views to the ditribution directory
  gulp.task('viewsmin', function(){
    return gulp.src('./app/views/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/views/'));

  });

  //Gulp copy fonts task - add new font-dependencies here
  gulp.task('copyfonts', function(){
    //bootstrap fonts
    var bootstrap_stream = gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*').pipe(gulp.dest('./dist/fonts'));
    var fontawesome_stream = gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*').pipe(gulp.dest('./dist/fonts'));
    return merge(bootstrap_stream, fontawesome_stream);
  });

  //browser-sync
  gulp.task('browser-sync', ['default'], function(cb){
    browserSync.init({
      server: {
        baseDir: "dist"
        , index: "index.html"
      }
    });
    cb();
  });

  //Gulp watch task - needs browser-sync pre-req because watch enforces reload
  gulp.task('watch', ['browser-sync'], function(){
    //watching javascript, css and html files and run usemin on change and reload browser to load new changes
    gulp.watch('{./app/scripts/**/*.js,./app/styles/**/*.css,./app/*.html}', ['update-distribution-usemin', reload]);
    //watching html views and run viewsmin on change and reload browser to load new changes
    gulp.watch('./app/views/*.html', ['viewsmin', reload]);
    //watching image files and run imagemin on change and reload browser to load new changes
    gulp.watch('./app/images/**/*', ['imagemin', reload]);
  });

  //build-distribution task
  gulp.task('build-distribution', ['usemin', 'viewsmin', 'imagemin', 'copyfonts']);

  //the default task
  gulp.task('default', function(cb){
    runsequence('clean','build-distribution',cb);
  });

  //update-distribution-usemin
  gulp.task('update-distribution-usemin', function(cb){
    runsequence('jshint', 'usemin', cb);
  });
