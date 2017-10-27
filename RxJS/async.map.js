/*
async.map

The async.map method produces a new array of values by mapping each value in the given array through the iterator function. The iterator is called with an item from the array and a callback for when it has finished processing. The callback takes 2 arguments, an error and the transformed item from the array. If the iterator passes an error to this callback, the main callback for the map function is immediately called with the error.

async version

In this example, we'll get the fs.stat for each file given and have the results returned as an array.
*/

var async = require('async'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

async.map(files, fs.stat, (err, results) => results.forEach(result => console.log(`is file: ${result.isFile()}`)));

/*
RxJS version

Using RxJS, we can achieve the same results of an array of all of our values by wrapping the fs.stat method again using our Rx.Observable.fromNodeCallback, then iterate using the Rx.Observable.for method, and finally, calling .toArray() to get our results as an entire array.
*/

var Rx = require('rx'),
    fs = require('fs');

var stat = Rx.Observable.fromNodeCallback(fs.stat);

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

Rx.Observable
    .for(files, stat)
    .toArray()
    .subscribe(
        results =>
        results.forEach(result => console.log(`is file: ${result.isFile()}`)),
        err => console.log(`err: ${err}`)
    );