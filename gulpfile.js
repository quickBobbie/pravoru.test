const { src, dest, watch, series, parallel } = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const minify = require('gulp-minify');

const libTaskSrc = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js'
];
const stylusSrc = './public/app/**/*.styl';
const jsSrc = './public/app/**/*.js';
const pugSrc = './public/app/**/*.pug';
const buildSrc = './public/build';

const libTask = () => {
    return src(libTaskSrc)
        .pipe(dest('./public/lib'))
};

const stylusTask = () => {
    return src(stylusSrc)
        .pipe(stylus({ compress: true }))
        .pipe(autoprefixer())
        .pipe(dest(buildSrc));
};

const pugTask = () => {
    return src(pugSrc)
        .pipe(pug({ compress: true }))
        .pipe(dest(buildSrc));
};

const jsTask = () => {
    return src(jsSrc)
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(dest(buildSrc));
};

const watchTask = () => {
    watch(stylusSrc, stylusTask);
    watch(pugSrc, pugTask);
    watch(jsSrc, jsTask);
};

exports.build = parallel(libTask, stylusTask, pugTask, jsTask);
exports.default = series(parallel(libTask, stylusTask, pugTask, jsTask), watchTask);