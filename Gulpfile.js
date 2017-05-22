var gulp = require('gulp');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var paths = {
  scripts: ['app/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
  return gulp.src('app/spec/tests/*.js')
   // gulp-jasmine works on filepaths so you can't have any plugins before it 
  .pipe(jasmine({
    reporter: new reporters.TapReporter()
  }));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['watch', 'scripts']);