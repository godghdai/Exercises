
/*
async.waterfall

The async.waterfall method runs an array of functions in series, each passing their results to the next in the array. However, if any of the functions pass an error to the callback, the next function is not executed and the main callback is immediately called with the error.

async version

In this example, we'll check whether a file exists, then rename it and finally return its stats.
*/
var async = require('async'),
    fs = require('fs'),
    path = require('path');

// Get file and destination
var file = path.join(__dirname, 'file.txt'),
    dest = path.join(__dirname, 'file1.txt');

async.waterfall([
    callback => {
        fs.exists(file, flag => {
            if (flag) {
                callback(new Error('File does not exist.'))
            } else {
                callback(null);
            }
        });
    },
    callback => {
        fs.rename(file, dest, err => callback(err));
    },
    callback => {
        fs.stat(dest, (err, fsStat) => callback(err, fsStat));
    }
], (err, fsStat) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(fsStat));
    }
})

/*
RxJS version

We can easily accomplish the same task as above using our wrappers for Rx.Observable.fromCallback and Rx.Observable.fromNodeCallback, creating a waterfall-like method. First, let's implement a waterfall method using plain RxJS in which we enumerate the functions and call flatMapLatest on each resulting observable sequence to ensure we only get one value.
*/
var Rx = require('rx');

var async = {
    waterfall: series => {
        return Rx.Observable.defer(() => {
            var acc = series[0]();
            for (var i = 1, len = series.length; i < len; i++) {

                // Pass in func to deal with closure capture
                (function (func) {

                    // Call flatMapLatest on each function
                    acc = acc.flatMapLatest(x => func(x));
                }(series[i]));
            }

            return acc; 
        });
    }
}

//Once we've defined this method, we can now use it such as the following, wrapping fs.exists, fs.rename and fs.stat.

var Rx = require('rx'),
    fs = require('fs'),
    path = require('path');

var file = path.join(__dirname, 'file.txt'),
    dest = path.join(__dirname, 'file1.txt'),
    exists = Rx.Observable.fromCallback(fs.exists),
    rename = Rx.Observable.fromNodeCallback(fs.rename),
    stat = Rx.Observable.fromNodeCallback(fs.stat);

var obs = async.waterfall([
    () => exists(file),
    (flag) => {
        // Rename or throw computation
        return flag ?
            rename(file, dest) :
            Rx.Observable.throw(new Error('File does not exist.'));
    },
    () => stat(dest)
]);

// Now subscribe to get the results or error
obs.subscribe(
    fsStat => console.log(JSON.stringify(fsStat)),
    console.log.bind(console)
);
