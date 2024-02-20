const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

// Compile SCSS into CSS
function style() {
    return gulp.src('./scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
}

// Watch files
function watch() {
    browserSync.init({
        server: './', // Set the base directory for serving files
        notify: false
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('**/*.php').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;
