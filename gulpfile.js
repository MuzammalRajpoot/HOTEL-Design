/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var jshint   = require('gulp-jshint');
var browserSync = require('browser-sync').create();

//  Minify Javascript
gulp.task('minifyjs', function(){
return gulp.src('src/*.js').pipe(uglify()).pipe(gulp.dest('dist'));   
});
//  Minify css
gulp.task('minifycss', function(){
return gulp.src('scss/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('css')).pipe(browserSync.stream());
});
// live reload
gulp.task('serve', ['minifycss'], function() {
    
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['minifycss']).on('change', browserSync.reload);
    gulp.watch("src/*.js", ['minifyjs']).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


//jshint

gulp.task('jshint', function(){
return gulp.src('src/*.js').pipe(jshint()).pipe(jshint.reporter('default'));   
});

// default file

gulp.task('default' , ['minifyjs' , 'minifycss' , 'jshint' ,'serve'] );