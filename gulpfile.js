var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './modules');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var typeFiles = [
  path.join(sourceDirectory,'/**/*.d.ts')
];

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function(done) {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('dap-query.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('dap-query.min.js'))
    .pipe(gulp.dest('./dist'));
  gulp.src(typeFiles)
    .pipe(gulp.dest('./dist/'));
  done();
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles.concat(typeFiles), gulp.series('process-all'));
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, function(){done();});
});

/**
 * Process
 */
gulp.task('process-all', gulp.series('jshint', 'test-src', 'build'));

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', gulp.series('process-all', 'watch'));
