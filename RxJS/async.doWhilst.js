/* 
 async.doWhilst

The async.doWhilst method is a post check version of whilst. To reflect the difference in the order of operations test and fn arguments are switched. doWhilst is to whilst as do while is to while in plain JavaScript.

async version

In this example we'll just run a keep calling the callback while the count is less than 5.
*/
var async = require('async');

var count = 0;

async.dowWilst(
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

We can achieve the same kind of functionality by using the doWhile on our observable sequence which takes a predicate to determine whether to continue running.
*/
var Rx = require('rx');

var i = 0;

var source = Rx.Observable.return(42).doWhile(
    () => ++i < 2)
    .subscribe(
        consoel.log.bind(console),
        err => { /* handle errors */ },
        () => console.log('done')
    );

