var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

//增加copy-html并将它作为default的依赖项，当default执行时，copy-html会被首先执行  
gulp.task("copy-html", function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

/*gulp.task("default", ["copy-html"], function() {  
    return browserify({  
            basedir: '.',  
            debug: true,  
            entries: ['src/main.ts'],  
            cache: {},  
            packageCache: {}  
        })  
    //使用tsify插件调用Browserify  
        .plugin(tsify)  
        .bundle()  
        //调用bundle后，使用source把输出文件命名为bundle.js  
        .pipe(source('bundle.js'))  
        .pipe(gulp.dest("dist"));  
});*/
