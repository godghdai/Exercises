/*
async.nextTick

The async.nextTick method calls the callback on a later loop around the event loop. In node.js this just calls process.nextTick, in the browser it falls back to setImmediate(callback) if available, otherwise setTimeout(callback, 0), which means other higher priority events may precede the execution of the callback.

async version

In this example we'll just run a keep calling the callback while the count is less than 5.
*/
var async = require('async');

var call_order = [];

async.nextTick(() => {
    call_order.push('two');
    // call_order now equals ['one','two']
});

call_order.push('one');

/*
RxJS version

We can achieve the same thing by using the Rx.Scheduler.timeout scheduler to schedule an item which will optimize for the runtime, for example, using process.nextTick if available, or setImmediate if available, or other fallbacks like MessageChannel, postMessage or even an async script load.
*/

var Rx = require('rx');

var call_order = [];

Rx.Scheduler.timeout.schedule(() => {
    call_order.push('two');
    // call_order now equals ['one','two']
});

call_order.push('one');
