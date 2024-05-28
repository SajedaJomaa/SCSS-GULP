const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require('gulp-sass')(require('sass')),
    // pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');
let notify = require("gulp-notify");
const ghPages = require('gulp-gh-pages');
const clean = require('gulp-clean');
const ftp = require('vinyl-ftp');


gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(sourcemaps.init())
        // .pipe(pug())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(notify("HTML Done!"))
        .pipe(livereload());
});
gulp.task('css', function () {
    return gulp.src('./src/assets/css/scss/*.scss')
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

// gulp.task('image', function () {
//     return gulp.src('./src/assets/images/*.*')
//         .pipe(gulp.dest('./dist/assets/images'));
// });

// gulp.task('clean', function () {
//     return gulp.src('dist', { read: false, allowEmpty: true })
//         .pipe(clean());
// });

// // Copy necessary files to the 'dist' directory
// gulp.task('copy', function () {
//     return gulp.src(['./src/**/*', '!./src/**/*.html'])
//         .pipe(gulp.dest('dist'));
// });

// // Deploy 'dist' directory to GitHub Pages
// gulp.task('deploy', function () {
//     return gulp.src('./dist/**/*')
//         .pipe(ghPages({
//             remoteUrl: 'https://github.com/SajedaJomaa/GulpDeploy.git' // Replace with your GitHub repository URL
//         }));
// });

// // Build task
// gulp.task('build', gulp.series('clean', 'copy'));

// // Default task
// gulp.task('default', gulp.series('build', 'deploy'));




// gulp.task('deploy', function () {
//     var conn = ftp.create({
//         host: 'https://github.com/SajedaJomaa/GulpDeploy.git',//website
//         user: 'SajedaJomaa',
//         password: 'mypassEngSajeda#123456789',
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
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/assets/css/scss/*.scss', gulp.series('css'));
    gulp.watch('./src/assets/js/*.js', gulp.series('script'));
    // gulp.watch('./src/assets/images/*.*', gulp.series('image'));
    // gulp.watch('dist/**/*.*', gulp.series('deploy'));

});

