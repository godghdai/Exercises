const watch = require('node-watch');
const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const syntax = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const path = require('path');
const mzfs = require('mz/fs');
const Rx = require('rxjs');
const sass = require('node-sass');

const watchObservable=Rx.Observable.create(observer => {
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

        await mzfs.writeFile(destPath, css).then(err => {
            //console.log('save !!')
        });

        return f_css;


    })(name).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

});




return;


Rx.Observable.create(observer => {
    let watcher = watch('./scss', { recursive: true });
    watcher.on('change', function(evt, name) {
        observer.next(name);
    });
    watcher.on('error', function(err) {
        observer.error(err);
    });
}).flatMap(name => {
    //let readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
    //return readFileAsObservable(path.resolve(__dirname, name), 'utf8');
    return Rx.Observable.fromPromise(
        mzfs.readFile(path.resolve(__dirname, name))
        .then(scss => {
            return {
                "name": name,
                "scss": scss
            };
        }).catch(err => {
            console.log(err);
        })
    );

}).flatMap(({ name, scss }) => {
    return Rx.Observable.fromPromise(
        postcss([precss, autoprefixer])
        .process(scss, {
            parser: syntax
        }).then(result => {
            return {
                "name": name,
                "css": result.css
            }
        }).catch(err => {
            console.log(err);
            return {
                "name": "",
            }
        })
    );
}).subscribe(({ name, css }) => {
    if (name == "") return;
    let destPath = path.format({
        dir: path.resolve(__dirname, "css"),
        name: path.basename(name, '.scss'),
        ext: '.css'
    });
    mzfs.writeFile(destPath, css).then(err => {
        console.log('save !!')
    });

});

