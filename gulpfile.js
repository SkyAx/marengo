var gulp        = require('gulp'),
    less        = require('gulp-less'),
    autoprefixer= require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    util        = require('gulp-util'),
    sftp        = require('gulp-sftp');

gulp.task('fa-fonts', function() {
    return gulp.src('app/libs/font-awesome/fonts/*.*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less().on('error', function (e) {
          util.log(util.colors.red('===== LESS COMPILE ERROR ====='));
          for (var i = 0; i < e.extract.length; i++) {
            util.log(util.colors.blue(e.extract[i]));
          }
          this.emit('end');
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
   browserSync({
       server: {
           baseDir: 'app'
       },
       notify: false
   });
});

gulp.task('css-libs', ['fa-fonts', 'less'], function () {
   return gulp.src('app/css/libs.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('app/css'));
});

gulp.task('js-libs', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/swiper/dist/js/swiper.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('app/js'))
});

gulp.task('clean', function () {
   return del.sync('dist');
});

gulp.task('clear-cache', function () {
    return cache.clearAll();
});

gulp.task('img-compress', function () {
   return gulp.src('app/img/**/*')
       .pipe(cache(imagemin({
           interlaced: true,
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           une: [pngquant()]
       })))
       .pipe(gulp.dest('dist/img'))
});

// =========== WATCH AND BUILD =========== //

gulp.task('default', ['browser-sync', 'js-libs', 'css-libs', 'watch']);

gulp.task('watch', function () {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'less', 'img-compress', 'js-libs'], function () {
    var buildCss = gulp.src('app/css/*')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildHTML = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sftp', function () {
    return gulp.src('dist/**/*')
        .pipe(sftp({
            host: '128.199.45.25',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root/marengo'
        }));
});
