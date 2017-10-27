const watch = require('node-watch');
const fs = require('fs-extra');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const path = require('path');
const mzfs = require('mz/fs');
const Rx = require('rxjs');
const sass = require('node-sass');
const glob = require("glob");

let _subject = new Rx.Subject();
let _subscription = _subject.subscribe(
    name => {
        (async function(name) {
            //console.log("------:" + name);
            let css = await new Promise(function(resolve, reject) {
                sass.render({
                    file: path.resolve(__dirname, name)
                }, (err, result)=>{
                    if (err) return reject(err);
                    resolve(result.css.toString());
                });
            });

            let f_css = await postcss([autoprefixer]).process(css).then(result => {
                result.warnings().forEach(warn=>{
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
        });
    },
    e => console.log('onError: ' + e.message),
    () => console.log('onCompleted'));


watch('./scss', { recursive: true })
    .on('change', (evt, name) => _subject.next(name))
    .on('error', err => _subject.error(err));

glob("./scss/**/*.scss", {}, function(er, files) {
    const dir = path.resolve(__dirname, "css");
    fs.ensureDir(dir, err => {
        if (err) return _subject.error(err);
        files.forEach(name => {
            _subject.next(name);
        });
    })
})