const fs = require('fs');
const spritesmith = require('gulp.spritesmith');
const gulp = require('gulp');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const precss = require('precss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const postcssFontMagician = require('postcss-font-magician');  // Для Гугловский шрифтов
const customMedia = require("postcss-custom-media");
const pump = require('pump');
const uglify = require('gulp-uglify');
const var tinypng = require('gulp-tinypng-compress');
const minifyCSS = require('gulp-minify-css');


let processors = [
precss(),
autoprefixer({ browsers: ['last 3 versions']}),
// postcssFontMagician(),
customMedia()
];
// Process
gulp.task('sprite', function(files) {
  let spriteData =
        gulp.src('./src/images/icons/*.png') // source path of the sprite images
        .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css',
        }));

   spriteData.img.pipe(gulp.dest('./src/images/')); // output path for the sprite
   spriteData.css.pipe(gulp.dest('./src/css/')); // output path for the CSS
   return spriteData;
 });


gulp.task('css',function(){
  return gulp.src('./src/css/screen.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./src/css/output.css'));
});


fs.watch('./src/images/icons/',{encoding : 'buffer'},(eventType,fileName)=>{
  if(eventType == 'rename' || eventType == 'change'){
   gulp.run('sprite');
 }
})


gulp.task('watch',function(){
  gulp.watch('./src/css/**',['css']);
  gulp.watch('./src/js/**',['js']);
})


// Build

gulp.task('js', function (callback) {
  pump([
    gulp.src('./src/js/*.js'),
    uglify(),
    gulp.dest('./dist/js/')
    ],
    callback
    );
});

gulp.task('tinypng', function () {
  gulp.src('src/**/*.{png,jpg,jpeg}')
  .pipe(tinypng({
    key: 'fCqEOwAjE-xjBf-xYe0VWLCvPQnco849',
    sigFile: 'images/.tinypng-sigs',
    log: true
  }))
  .pipe(gulp.dest('dist'));
});



gulp.task('compressCss', function () {
  return gulp.src('./src/css/screen.css')
  .pipe(postcss(processors))    // Need finify
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build',function(){
  del(['./dist']);
  runSequence(['tinypng', 'compressCss'], 'compressJs', callback);
})
