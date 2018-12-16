var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

var config = {
    proxy: 'portfolio.net',
    srcCss: [
        '!./src/scss/bootstrap/bootstrap.scss',
        '!./src/scss/bootstrap/bootstrap-reboot.scss',
        '!./src/scss/bootstrap/bootstrap-grid.scss',
        './src/scss/**/*.scss'
    ],
    destCss: './css',
    srcJs: [
        './src/js/app.js'
    ],
    destJs: './js',
    srcImg: './src/img',
    dstImg: './img',
    img: {
        jpg: '/**/*.jpg',
        png: '/**/*.png',
        gif: '/**/*.gif',
        jpeg: '/**/*.jpeg',
        svg: '/**/*.svg',
        ico: '/**/*.ico'
    },
    srcImgCompress: ['./src/img/**/*.jpg', './src/img/**/*.png'],
    dstImgCompress: ['./img/**/*.jpg', './img/**/*.png'],
    cakeModels: './src/Model/**/*.php'
};

/**
 * Removes all files inside `tmp` directory
 */
gulp.task('clean-tmp', function () {
    console.log('Cleaning tmp...');
    return gulp.src('./tmp/*')
        .pipe(clean({force: false}));
});

/**
 * Removes all images declared in `dstImages`
 */
gulp.task('clean-images', function () {
    console.log('Cleaning images...');
    return gulp.src(config.dstImgCompress)
        .pipe(clean({force: false}));
});

/**
 * Compiles Sass files for front-end use
 */
gulp.task('build-css', function () {
    gulp.src(config.srcCss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.destCss))
        .pipe(minCss())
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destCss))
});

/**
 * Compiles JS files for front-end use
 */
gulp.task('build-js', function () {
    return gulp.src(config.srcJs)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.destJs))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.destJs));
});

/**
 * Copies images from src to dst location
 */
gulp.task('images', function () {
    gulp.src([config.srcImg + config.img.jpg, config.srcImg + config.img.jpeg, config.srcImg + config.img.png, config.srcImg + config.img.gif, config.srcImg + config.img.svg, config.srcImg + config.img.ico])
        .pipe(plumber())
        .pipe(gulp.dest(config.dstImg));
});

/**
 * Removes dst images, copresses and copies images from src to dst location
 */
gulp.task('images-compress', function () {
    gulp.start('clean-images');
    gulp.src(config.srcImgCompress)
        .pipe(plumber())
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest(config.dstImg));
});

/**
 * Watch models and cleans tmp directory if something changed
 */
gulp.task('watch-models', function () {
    return watch(config.cakeModels, function () {
        gulp.start('clean-tmp');
    });
});

/**
 * Watch images and copies images from src to dst directory
 */
gulp.task('watch-images', function () {
    return watch(config.srcImg, function () {
        gulp.start('images');
    });
});

//Browser auto refresh init
gulp.task('browser-sync', function() {
    browserSync.init({
        files: ['./*.html', './css/main.min.css', './src/scss/main.scss', './src/scss/partials/*.scss', './src/js/*.js'],
        proxy: config.proxy
    });
});

/**
 * Main watcher
 */
gulp.task('watcher', function () {
    gulp.watch(config.srcCss, ['build-css']).on('change', function (evt) {
        console.log('[watcher] File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...');
    });
    gulp.watch(config.srcJs, ['build-js']);
    gulp.start('watch-images');
    gulp.start('watch-models');
});

/**
 * Default task
 */
gulp.task('default', ['build-css', 'build-js', 'images', 'watcher']);
gulp.task('sync', ['build-css', 'build-js', 'images', 'watcher', 'browser-sync']);
