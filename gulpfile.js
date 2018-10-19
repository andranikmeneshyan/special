const fs = require('fs');
const spritesmith = require('gulp.spritesmith');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const precss = require('precss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const postcssFontMagician = require('postcss-font-magician');  // Для Гугловский шрифтов
const customMedia = require("postcss-custom-media");
const pump = require('pump');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const del = require('del');
const tinypng = require('gulp-tinypng-compress');
const cssnano = require('cssnano');
const processors = [
  precss(),
// postcssFontMagician(),
  customMedia()
];

const buildProcessors = [

  autoprefixer({browsers: ['last 3 versions']}),
  cssnano
// postcssFontMagician(),
];

gulp.task('sprite', function (files) {
  let spriteData =
      gulp.src('./src/images/icons/*.png') // source path of the sprite images
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
      }));
  spriteData.img.pipe(gulp.dest('./src/css/')); // output path for the sprite
  spriteData.css.pipe(gulp.dest('./src/css')); // output path for the CSS
  return spriteData;
});

gulp.task('css', function () {
  return gulp.src('./src/postcss/screen.css')
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./src/css/'));
});

fs.watch('./src/images/icons/', {encoding: 'buffer'}, (eventType, fileName) => {
  if (eventType == 'rename' || eventType == 'change') {
    gulp.run('sprite');
  }
});

gulp.task('watch', function () {
  gulp.watch('./src/postcss/**', ['css']);
});

// build

gulp.task('build:css', function () {
  return gulp.src('./src/postcss/*.css')
      .pipe(postcss(buildProcessors))
      .pipe(gulp.dest('./dist/css/'));
});
gulp.task('build:images', function () {
  return gulp.src('src/**/*.{png,jpg,jpeg}')
      .pipe(tinypng({
        key: 'fCqEOwAjE-xjBf-xYe0VWLCvPQnco849',
        sigFile: 'images/.tinypng-sigs',
        log: true
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('build:sprite', function () {
  return gulp.src('src/css/sprite.png')
      .pipe(tinypng({
        key: 'fCqEOwAjE-xjBf-xYe0VWLCvPQnco849',
        sigFile: 'images/.tinypng-sigs',
        log: true
      }))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', function () {
  console.log('js');
  return pump([
    gulp.src('./src/js/*.js'),
    uglify(),
    gulp.dest('./dist/js/')
  ]);
});

gulp.task('clear',function(){
   return del(['./dist']);
});

gulp.task('build',['clear','build:css', 'build:sprite', 'build:js', 'build:images']);
