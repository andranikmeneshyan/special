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

let processors = [
precss(),
autoprefixer({ browsers: ['last 3 versions']}),
// postcssFontMagician(),
customMedia()
];

gulp.task('sprite', function(files) {
  let spriteData =
        gulp.src('./src/images/icons/*.png') // source path of the sprite images
        .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css',
        }));

   spriteData.img.pipe(gulp.dest('./src/images/')); // output path for the sprite
   spriteData.css.pipe(gulp.dest('./src/css')); // output path for the CSS
   return spriteData;
 });


gulp.task('css',function(){
  return gulp.src('./src/postcss/screen.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./src/css/'));
});


fs.watch('./src/images/icons/',{encoding : 'buffer'},(eventType,fileName)=>{
  if(eventType == 'rename' || eventType == 'change'){
   gulp.run('sprite');
 }
})


gulp.task('watch',function(){
  gulp.watch('./src/postcss/**',['css']);
})


// build

gulp.task('build:css',function(){
  return gulp.src('./src/postcss/screen.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('./dist/css/'));
// need minified

})
gulp.task('build:images',function(){
  return gulp.src('src/**/*.{png,jpg,jpeg}')
  .pipe(tinypng({
    key: 'fCqEOwAjE-xjBf-xYe0VWLCvPQnco849',
    sigFile: 'images/.tinypng-sigs',
    log: true
  }))
  .pipe(gulp.dest('dist'));
})

gulp.task('build:js', function (callback) {
 console.log('js');
 pump([
  gulp.src('./src/js/*.js'),
  uglify(),
  gulp.dest('./dist/js/')
  ],
  callback
  );
});

gulp.task('build',function(){
  del(['./dist']);
  runSequence('css',['build:css', 'build:images', 'build:js']);
})
