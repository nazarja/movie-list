/*====================================================
    Using Gulp to watch and concat files into a 
    single file in a specific order.

    Gulp Sass also is piped to an autoprefixer to
    apply browser specific styles.

    A single command is used to watch & concat files.
====================================================*/



//==================================
// Requires /Imports
// =================================

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');



//==================================
// Watch Tasks
// =================================

// SASS
gulp.task('watch-sass', () => {
    gulp.src([
                'app/styles/sass/main.scss',
    ])
    .pipe(concat('styles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 1 version']
    }))
    .pipe(gulp.dest('app/styles/css'));
});


// JS
gulp.task('watch-js', () => {
    gulp.src([
                'app/js/src/main.js',
    ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('app/js/dist'));
});



//==================================
// CLI Taskrunner Command
// =================================

gulp.task('watch', () => {
    gulp.watch('app/styles/sass/*.scss ', ['watch-sass']);
    gulp.watch('app/js/src/*.js ', ['watch-js']);
});