/*  
async.concat

The async.concat method applies an iterator to each item in a list, concatenating the results. Returns the concatenated list. The iterators are called in parallel, and the results are concatenated as they return.

async version

In this example, we'll determine whether the file exists by calling fs.exists for each file given and have the results returned as an array.
*/
var async = require('async'),
    fs = require('fs');

var directories = ['dir1', 'dir2', 'dir3'];

async.concat(files, fs.readdir, (err, files) => {
    // files is now a list of filenames that exist in the 3 directories
});

/*
RxJS version

Using RxJS, we can achieve the same results of an array of all of our values by wrapping the fs.readdir method using our Rx.Observable.fromNodeCallback. Then we'll iterate using the Rx.Observable.for method, then call reduce to add each item to the item to the overall list.
*/


var Rx = require('rx'),
    fs = require('fs');

var readdir = Rx.Observable.fromNodeCallback(fs.readdir);

Rx.Observable
    .for(files, readdir)
    .reduce((acc, x) => { acc.push(x); return acc; }, [])
    .subscribe(
        files => {
            // files is now a list of filenames that exist in the 3 directories
        },
        err => {
            // handle error
        });

