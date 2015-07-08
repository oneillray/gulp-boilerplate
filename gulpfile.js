// requires gulp 
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Requiring Sourcemaps ( handy for degugging in inspector)
var sourcemaps = require('gulp-sourcemaps');
//  Requiring browser sync for refreshing the screen when there's changes
var browserSync = require('browser-sync');


// Adding watchers so it can do stuff such as compiling sass files when file has changed.
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/sass/style.scss', ['sass']);
  gulp.watch('app/index.html', [browserSync.reload]);
  // ... Other watchers
});


// Gulp task for compiling scss to css

gulp.task('sass', function() {
  return gulp.src('app/sass/style.scss') // Gets the style.scss file ( added the return starting up browserSync)
    .pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass()) // Passes it through a gulp-sass task
    .pipe(autoprefixer()) // Passsit it through the gulp-autoprefixer
    .pipe(sourcemaps.write()) // Writing sourcemaps 
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));

});

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})