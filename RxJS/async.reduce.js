/*
The async.reduce method reduces a list of values into a single value using an async iterator to return each successive step. Memo is the initial state of the reduction. This function only operates in series. For performance reasons, it may make sense to split a call to this function into a parallel map, then use the normal Array.prototype.reduce on the results. This function is for situations where each step in the reduction needs to be async, if you can get the data before reducing it then it's probably a good idea to do so.

async version

In this example, we'll determine whether the file exists by calling fs.exists for each file given and have the results returned as an array.
*/
var async = require('async'),
    fs = require('fs');

function reduction(acc, x, cb) {
    process.nextTick(() => cb(null, acc + x));
}

async.reduce([1, 2, 3], 0, fs.reduction, (err, results) => console.log(results));

// => 6
/*
RxJS version

In RxJS, we have a number of ways of doing this including using Rx.Observable.fromArray to turn an array into observable sequence, then we can call reduce to add the numbers. To ensure that it is indeed async, we can switch to the Rx.Scheduler.timeout to ensure that it is done via a callback.
*/
var Rx = require('rx'),
    fs = require('fs');

Rx.Observable
    .fromArray([1, 2, 3], Rx.Scheduler.timeout)
    .reduce((acc, x) => acc + x, 0)
    .subscribe(console.log.bind(console));
// => 6