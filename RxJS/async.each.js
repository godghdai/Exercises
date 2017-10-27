/*
async.each

The async.each method applies an iterator function to each item in an array, in parallel. The iterator is called with an item from the list and a callback for when it has finished. If the iterator passes an error to this callback, the main callback for the each function is immediately called with the error.

async version

In this example, we will use async.each to iterate an array of files to write some contents and save.
*/
var async = require('async'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

function saveFile(file, cb) {
    fs.writeFile(file, 'Hello Node', err => cb(err));
}

async.each(files, saveFile, err => {
    // if any of the saves produced an error, err would equal that error
});

/*
RxJS version

Using RxJS, you can accomplish this task in a number of ways by using Rx.Observable.fromNodeCallback to wrap the fs.writeFile function, and then iterate the files by using the Rx.Observable.for method.
*/


var Rx = require('rx'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

// wrap the method
var writeFile = Rx.Observable.fromNodeCallback(fs.writeFile);

Rx.Observable
    .for(files, file => writeFile(file, 'Hello Node'))
    .subscribe(
        () => console.log('file written!'),
        err => console.log(`err ${err}`),
        () => console.log('completed!')
    );