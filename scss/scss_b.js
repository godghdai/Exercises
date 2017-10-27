const watch = require('node-watch');
const fs = require('fs-extra');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const path = require('path');
const mzfs = require('mz/fs');
const Rx = require('rxjs');
const sass = require('node-sass');
const glob = require("glob");

Rx.Observable.create(observer => {
    let watcher = watch('./scss', { recursive: true });
    watcher.on('change', function(evt, name) {
        observer.next(name);
    });
    watcher.on('error', function(err) {
        observer.error(err);
    });
}).subscribe(sassToCss);

function sassToCss(name) {
    Rx.Observable.create(observer => {
        sass.render({
            file: path.resolve(__dirname, name)
        }, function(err, result) {
            if (err) return observer.error(err);
            observer.next(result.css.toString());
            observer.complete();
        });
    }).flatMap(txt => {
        return Rx.Observable.fromPromise(
            postcss([autoprefixer]).process(txt).then(result => {
                result.warnings().forEach(warn => console.warn(warn.toString()));
                return result.css;
            }).catch(err => {
                if (err) console.log(err);
                return txt;
            })
        );
    }).subscribe(css => {
        console.log(css);
        let destPath = path.format({
            dir: path.resolve(__dirname, "css"),
            name: path.basename(name, '.scss'),
            ext: '.css'
        });
        mzfs.writeFile(destPath, css).then(err => {
            if (err) console.log(err);
        })
    })
}

glob("./scss/**/*.scss", {}, function(er, files) {
    const dir = path.resolve(__dirname, "css");
    fs.ensureDir(dir, err => {
        console.log(err)
        files.forEach(sassToCss);
    })
})


/*

const watchObservable = Rx.Observable.create(observer => {
    let watcher = watch('./scss', { recursive: true });
    watcher.on('change', function(evt, name) {
        observer.next(name);
    });
    watcher.on('error', function(err) {
        observer.error(err);
    });
});

watchObservable.subscribe(name => {

    (async function(name) {

        let css = await new Promise(function(resolve, reject) {
            sass.render({
                file: path.resolve(__dirname, name)
            }, function(err, result) {
                if (err) return reject(err);
                resolve(result.css.toString());
            });
        });

        let f_css = await postcss([autoprefixer]).process(css).then(result => {
            result.warnings().forEach(function(warn) {
                console.warn(warn.toString());
            });
            return result.css;
        }).catch(err => {
            console.log(err);
            return css;
        });

        let destPath = path.format({
            dir: path.resolve(__dirname, "css"),
            name: path.basename(name, '.scss'),
            ext: '.css'
        });

        await mzfs.writeFile(destPath, f_css).then(err => {
            //console.log('save !!')
        });

        return f_css;


    })(name).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

});

*/