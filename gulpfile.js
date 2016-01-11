var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');
    connect = require('gulp-connect');
    concat = require('gulp-concat');
    

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
	'components/scripts/*.js'
];

var sassSources = ['components/sass/style.scss'];

var htmlSources = ['builds/development/*.html'];

// coffee process
gulp.task('coffee', function() {
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

// js process
gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

// compass process
gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			images: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

// gulp watch

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
});

// Live Reload
gulp.task('connect', function() {
	connect.server({
		root: 'builds/development/',
		livereload: true
	})
});

// html process
gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

// all process same time
gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);