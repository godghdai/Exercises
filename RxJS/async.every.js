/* 
async.every

The async.every method returns true if every element in the array satisfies an async test. The callback for each iterator call only accepts a single argument of true or false, it does not accept an error argument first! This is in-line with the way node libraries work with truth tests like fs.exists.

async version

In this example, we'll determine whether the file exists by calling fs.exists for each file given and have the results returned as an array.
*/
var async = require('async'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

async.every(files, fs.exists, result => {
    // if result is true then every file exists
});

/*
RxJS version

Using RxJS, we can achieve the same results of an array of all of our values by wrapping the fs.exists method using our Rx.Observable.fromCallback as it only has one result, a true or false value instead of the usual callback with error and result. Then we'll iterate using the Rx.Observable.for method, then call every to determine whether all match.
*/
var Rx = require('rx'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

var exists = Rx.Observable.fromCallback(fs.exists);

Rx.Observable
    .for(files, exists)
    .every()
    .subscribe(
        results => {
            // if result is true then every file exists
      });
