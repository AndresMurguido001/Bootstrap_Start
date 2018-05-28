const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
//Gulp Tasks
// 1) Compile sass and inject into browser
gulp.task("sass", function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream())
})
// 2) Move JS files to src/js
gulp.task("js", function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))
  .pipe(browserSync.stream())
})
// 3) Watch Sass and Server
gulp.task("serve", ['sass'], function(){
  browserSync.init({
    server: './src'
  });
  gulp.watch(['node_modules/boostrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass'])
  gulp.watch('src/*.html').on("change", browserSync.reload)
})

//move fontawesom folder to src fonts/scss
gulp.task("fonts", function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"))
})
// Move font-awesome css to src/class
gulp.task("fa", function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"))
})
//Default task which will run above tasks
gulp.task("default", ['js', 'serve', 'fa', 'fonts'])
