var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
changed = require('gulp-changed'),
rev = require('gulp-rev'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
del = require('del');

//JsHint Gulp Task
gulp.task('jshint', function(){
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(stylish));
});

//Clean Task
gulp.task('clean', function(){
  //removes the 'dist' folder completely
  return del(['dist']);
});

//usemin task
gulp.task('usemin', ['jshint'], function(){
  return gulp.src('app/menu.html')
  .pipe(usemin({
    css: [minifycss(), rev()],
    js: [uglify(), rev()]
  }))
  .pipe(gulp.dest('dist/'));
  // .pipe(browserSync.stream());
});

//imagemin task
gulp.task('imagemin', function(){
  return del(['dist/images']), gulp.src('app/images/**/*')
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
  // .pipe(browserSync.stream())
  .pipe(notify({
    onLast: true,
    message: 'Images task complete'
  }));
});

//copyFonts Task
gulp.task('copyfonts', function(){
  //No transformation required for these files, they're just being copied to the distribution folder
  return del(['dist/fonts']), gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts')),
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
});

//Configuring the Watch Task
gulp.task('watch', ['browser-sync'], function(){
  //watch css and js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin', reload]);

  //watch image files
  gulp.watch('app/images/**/*', ['imagemin', reload]);

});

//browserSync task
gulp.task('browser-sync', ['default'], function () {

  browserSync.init(null, {
    server: {
      baseDir: "dist",
      index: "menu.html"
    }
  });
});

//Default task
gulp.task('default', ['clean'], function(){
  gulp.start('usemin', 'imagemin', 'copyfonts');
});
