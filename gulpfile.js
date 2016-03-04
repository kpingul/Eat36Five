/* Gulp Plugins */

var gulp    = require('gulp'),
  concat    = require('gulp-concat'),
  rename    = require('gulp-rename'),
  uglify    = require('gulp-uglify'),
  minifyCss   = require('gulp-minify-css');

/* Resuable path configuration */

var paths = {

  bower: 'client/bower_components/',
  js: 'client/js/',
  css: 'client/css/'

}

/* ***************** */

/* Define Gulp Tasks */

/* ***************** */


//Javascript Library Dependencies 

gulp.task('libDepsJs', function(){

  return gulp.src([
      paths.bower + 'jquery/dist/jquery.js',
      paths.bower + 'angular/angular.js',
      paths.bower + 'angular-ui-router/release/angular-ui-router.js',
      paths.bower + 'bootstrap/dist/js/bootstrap.js',
      paths.bower + 'slick-carousel/slick/slick.js',
      paths.bower + 'angular-slick/dist/slick.js',
      paths.bower + 'swipebox/src/js/jquery.swipebox.js'
    ])
    .pipe(concat('libDepsJs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('client/build'));
});


//CSS Dependencies 

// gulp.task('depsCss', function(){

//   return gulp.src([
//       paths.bower + 'bootstrap/dist/css/bootstrap.min.css'
//     ])

//     .pipe(minifyCss())
//     .pipe(rename('deps.min.css'))
//     .pipe(gulp.dest('build'));
// });


//Javascript scripts

gulp.task('scripts', function(){

  return gulp.src([
      paths.js + 'venue/VenueApp.js',
      paths.js + 'venue/**/*.js'
    ])
    .pipe(concat('VenueApp.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('client/build'));
});


//CSS sheets

gulp.task('styles', function(){

  return gulp.src([
      paths.bower + 'slick-carousel/slick/slick-theme.css',
      paths.bower + 'slick-carousel/slick/slick.css',
      paths.bower + 'swipebox/src/css/swipebox.css',
      paths.bower + 'leaflet/dist/leaflet.css',
      paths.css + 'stylesheet.css'
    ])
    .pipe(concat('stylesheetVenue.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('client/build'));
});



/* ***************** */

/* Define Watch Tasks */

/* ***************** */

//Javascript files
// gulp.task('watchScripts', function(){

//   return gulp.watch('src/js/app/**/*.js', ['scripts']);

// })


// //CSS files
// gulp.task('watchStyles', function(){
  
//   return gulp.watch('src/css/*.css', ['styles']);

// });





// //RUN IN SEQUENCE
// gulp.task('default', ['watchScripts', 'watchStyles']);


