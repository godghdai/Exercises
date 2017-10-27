/*
async.detect

The async.detect method returns the first value in a list that passes an async truth test. The iterator is applied in parallel, meaning the first iterator to return true will fire the detect callback with that result.

async version

In this example, we'll get the first file that matches.
*/
var async = require('async'),
    fs = require('fs');

var files = ['file1','file2','file3'];

async.detect(files, fs.exists, result => {
    // result now equals the first file in the list that exists
});

/*
RxJS version

In RxJS, we can iterate over the files as above using Rx.Observable.for and then calling first to get the first matching file project forward the file name and whether the file exists.
*/

var Rx = require('rx'),
    fs = require('fs');

var files = ['file1','file2','file3'];

var exists = Rx.Observable.fromCallback(fs.exists);

Rx.Observable
    .for(files, file => ({ file: file, exists: exists(file) }))
    .first(x => x.exists)
    .subscribe(
        result => {
            // result now equals the first file in the list that exists
        });
