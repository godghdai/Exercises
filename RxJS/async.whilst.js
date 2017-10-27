/*
async.whilst

The async.whilst method repeatedly call function, while test returns true. Calls the callback when stopped, or an error occurs.

async version

In this example we'll just run a keep calling the callback while the count is less than 5.
*/
var async = require('async');

var count = 0;

async.whilst(
    () => count < 5,
    callback => {
        count++;
        setTimeout(callback, 1000);
    },
    err => {
        // 5 seconds have passed
    }
);

/*
RxJS version

We can achieve the same kind of functionality by using the Rx.Observable.while method which takes a condition and an observable sequence that we created by calling Rx.Observable.create.
*/

var Rx = require('rx');

var count = 0;

Rx.Observable.while(
        () => count < 5,
        Rx.Observable.create(function (obs) {
            setTimeout(() => observer.onNext(count++), 1000)
        }
    )
    .subscribe(
        x => { /* do something with each value */ },
        err => { /* handle errors */ },
        () => { /* 5 seconds have passed */ }
  );

