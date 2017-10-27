/*
async.filter

The async.filter method returns a new array of all the values which pass an async truth test.The callback
for each iterator call only accepts a single argument of true or false, it does not accept an error argument first!This is in -line with the way node libraries work with truth tests like fs.exists.

async version

In this example, we 'll determine whether the file exists by calling fs.exists for each file given and have the results returned as an array.
*/
var async = require('async'),
    fs = require('fs');

var files = ['file1.txt', 'file2.txt', 'file3.txt'];

async.filter(files, fs.exists, (err, results) => {
    results.forEach(result => console.log(`exists: ${result}`));
});

/*
RxJS version

Using RxJS, we can achieve the same results of an array of all of our values by wrapping the fs.exists method using our Rx.Observable.fromCallback as it only has one result, a true or false value instead of the usual callback with error and result.Then we 'll iterate using the Rx.Observable.for method, filter the existing files and finally, calling .toArray() to get our results as an entire array.
*/
var Rx = require('rx'),
    fs = require('fs');

var exists = Rx.Observable.fromCallback(fs.exists);

Rx.Observable
    .for(files, exists)
    .where(x => x)
    .toArray()
    .subscribe(
        results =>
        results.forEach(result => console.log(`exists: ${result}`));
    );