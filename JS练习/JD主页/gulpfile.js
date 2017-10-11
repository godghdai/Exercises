/*
npm install gulp -g   (global环境)
npm install gulp --save-dev (项目环境)
npm install gulp-minify-css gulp-concat gulp-uglify gulp-rename del --save-dev
*/
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');


gulp.task('minifyjs', function() {
    gulp.src('js/lib/*.js')
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minifycss', function() {
    gulp.src('css/*.css') 
        .pipe(concat('index.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css')); 
});

gulp.task('clean', function() {
   return gulp.src('dist/*.css', {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('minifycss','minifyjs');
});