const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require('gulp-sass')(require('sass')),
    // pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ftp = require('vinyl-ftp');
let notify = require("gulp-notify");

gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(sourcemaps.init())
        // .pipe(pug())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(notify("HTML Done!"))
        .pipe(livereload());
});
gulp.task('css', function () {
    return gulp.src('./src/assets/css/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 100 versions", "> 1%"],
            cascade: false,
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify("CSS Done!"))
        .pipe(livereload());
});


gulp.task('script', function () {
    return gulp.src('./src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify("JS Done!"))
        .pipe(livereload());
});

// gulp.task('compress', function () {
//     return gulp.src('dist/**/*.*')
//         .pipe(zip('archive.zip'))
//         .pipe(gulp.dest('.'))
//         .pipe(notify("File Compressed"))

// })
// gulp.task('deploy', function () {
//     var conn = ftp.create({
//         host: 'mywebsite.tld',//website
//         user: 'me',
//         password: 'mypass',
//         parallel: 10,
//     });


//     return gulp.src(['dist/**/*.*'], { base: '.', buffer: false })
//         .pipe(conn.newer('/public_html')) // only upload newer files
//         .pipe(conn.dest('/public_html'))
//         .pipe(livereload());

// });


gulp.task('watch', function () {
    require('./server.js')
    livereload.listen();
    gulp.watch('./src/index.html', gulp.series('html'));
    gulp.watch('./src/assets/css/scss/style.scss', gulp.series('css'));
    gulp.watch('./src/assets/js/*.js', gulp.series('script'));
    // gulp.watch('dist/**/*.*', gulp.series('compress'));
    // gulp.watch('dist/**/*.*', gulp.series('deploy'));

});

