/*
async.some

The async.some method returns true if at least one element in the array satisfies an async test. The callback for each iterator call only accepts a single argument of true or false, it does not accept an error argument first! This is in-line with the way node libraries work with truth tests like fs.exists. Once any iterator call returns true, the main callback is immediately called.

async version

In this example, we'll determine whether the file exists by calling fs.exists for each file given and have the results returned as an array.
*/
var async = require('async'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

async.some(files, fs.exists, result => {
    // if result is true then at least one of the files exists
});

/* 
RxJS version

Using RxJS, we can achieve the same results of an array of all of our values by wrapping the fs.exists method using our Rx.Observable.fromCallback as it only has one result, a true or false value instead of the usual callback with error and result. Then we'll iterate using the Rx.Observable.for method, then call some to determine whether any match.
*/
var Rx = require('rx'),
    fs = require('fs');

var exists = Rx.Observable.fromCallback(fs.exists);

Rx.Observable
    .for(files, exists)
    .some()
    .subscribe(
        results => {
            // if result is true then at least one of the files exists
       });
