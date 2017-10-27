/*
async.parallel

The async.parallel runs an array of functions in parallel, without waiting until the previous function has completed. If any of the functions pass an error to its callback, the main callback is immediately called with the value of the error. Once the tasks have completed, the results are passed to the final callback as an array.

It is also possible to use an object instead of an array. Each property will be run as a function and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from async.parallel.

async version

In this example we'll run some examples with both an array or an object.
*/
var async = require('async');

async.parallel([
    callback => setTimeout(() => callback(null, 'one'), 200),
    callback => setTimeout(() => callback(null, 'two'), 100)
],

// optional callback
(err, results) => {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});



// an example using an object instead of an array
async.parallel({
    one: callback => setTimeout(() => callback(null, 1), 200),
    two: callback => setTimeout(() => callback(null, 2), 100)
},
(err, results) => {
    // results is now equals to: {one: 1, two: 2}
});

/*
RxJS version

We can achieve the same functionality of async.series with an array by calling Rx.Observable.forkJoin with our array of observable sequences. This returns the last value from each sequence in "parallel".
*/
var Rx = require('rx');

function wrapArrayParallel (items) {
    return Rx.Observable.forkJoin.apply(null, items);
}

wrapArrayParallel([
        Rx.Observable.return('one'),
        Rx.Observable.return('two')
    ])
    .subscribe(
        console.log.bind(console),
        err => console.log(`Error: ${err}`)
    );

// => ['one', 'two']
/*
Using an object literal can also be achieved with a little bit more work, but totally reasonable. Instead of simply calling forkJoin, we first need to extract the observable sequences by calling map on the keys we obtained by Object.keys. Because the order of observable sequences is deterministic, we can then call map to transform the array into an object, by calling reduce on the array, turning the array into an object with the appropriate keys.
*/
var Rx = require('rx');


function wrapObjectParallel (obj) {
    var keys = Object.keys(obj);
    var mapped = keys.map(key => obj[key]);

    return Rx.Observable.forkJoin.apply(null, mapped)
        .map(arr => {
            var idx = 0;
            return arr.reduce((acc, x) => {
                var key = keys[idx++];

                var newObj = {};
                for (var prop in acc) {
                    if(!hasOwnProperty.call(acc)) {
                        newObj[prop] = acc[prop];
                    }
                }

                newObj[key] = x;

                return newObj;                
            }, {})
        });
}

wrapObjectParallel({
        one: Rx.Observable.return(1),
        two: Rx.Observable.return(2)
    })
    .subscribe(
        console.log.bind(console),
        err => console.log(`Error: ${err}`)
    );

///* => { one: 1, two: 2 }
