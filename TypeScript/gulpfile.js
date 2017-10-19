const gulp = require("gulp");
const watch = require('gulp-watch');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const batch = require('gulp-batch');
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json', {
    "allowJs": true,
    "target": "es3",
    "module": "system",
    "experimentalDecorators": false
});

gulp.task('build', function() {
    //var tsResult = gulp.src("lib/**/*.ts") // or tsProject.src()
    return gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('./maps', {
            mapFile: function(mapFilePath) {
                // source map files are named *.map instead of *.js.map
                return mapFilePath.replace('.js.map', '.map');
            }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('default', function() {
    watch('src/**/*.ts', batch(function(events, done) {
        gulp.start('build', done);
    }));
});