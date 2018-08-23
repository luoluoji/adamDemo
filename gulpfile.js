var gulp = require("gulp");
var connect = require('gulp-connect');
/*gulp.task("hello",function(){
	console.log("hellow");
})*/
gulp.task('copy_index',function(){
	return gulp.src(["*.html"]).pipe(gulp.dest('dist')).pipe(connect.reload());
})
gulp.task('images',function(){
	return gulp.src("images/**/*").pipe(gulp.dest('dist/images')).pipe(connect.reload());
})
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('js',function(){
	return gulp.src('js/**/*').pipe(gulp.dest('dist/js')).pipe(connect.reload());
})
gulp.task('json',function(){
	return gulp.src('code/**/*').pipe(gulp.dest('dist/code')).pipe(connect.reload());
})
var sass = require('gulp-sass');
var minifyCSS = require("gulp-minify-css");
gulp.task('sass',function(){
	return gulp.src('scss/**/*')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})
gulp.task('watch',function(){
	gulp.watch(['*.html'],['copy_index']);
	gulp.watch('images/**/*',['images']);
	gulp.watch('js/**/*',['js']);
	gulp.watch('code/**/*',['json']);
	gulp.watch('scss/**/*',['sass']);
})
gulp.task('server',function(){
	connect.server({
		root:'dist',
		port:8888,
		livereload:true
	})
})
gulp.task('default',["server","watch"]);
