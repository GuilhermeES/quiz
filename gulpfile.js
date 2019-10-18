var gulpfile = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify-es').default;

var tsProject = ts.createProject("tsconfig.json");

gulpfile.task('ts',function(){
    return gulpfile.src('scripts/**/*.ts')
        .pipe(tsProject())
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulpfile.dest('dist'));
});
