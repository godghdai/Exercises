/*
async.series

The async.series runs an array of functions in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run and the callback for the series is immediately called with the value of the error. Once the tasks have completed, the results are passed to the final callback as an array.

It is also possible to use an object instead of an array. Each property will be run as a function and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from async.series.

async version

In this example we'll run some examples with both an array or an object.
*/
var async = require('async');

async.series([
    callback => setTimeout(() => callback(null, 'one'), 200),
    callback => setTimeout(() => callback(null, 'two'), 100)
],
// optional callback
(err, results) => {
    // results is now equal to ['one', 'two']
});


// an example using an object instead of an array
async.series({
    one: callback => setTimeout(() => callback(null, 1), 200),
    two: callback => setTimeout(() => callback(null, 2), 100)
},
(err, results) => {
    // results is now equal to: {one: 1, two: 2}
});

/*
RxJS version

We can achieve the same functionality of async.series with an array by simply calling fromArray and calling flatMap to give us the observable of the current. Then we'll call reduce to add each item to a new array to return.
*/


var Rx = require('rx');

function wrapArray (items) {
    return Rx.Observable
        .fromArray(items)
        .flatMap(x => x)
        .reduce((acc, x) => {
            var arr = acc.slice(0);
            arr.push(x);
            return arr;
        }, []);
}

wrapArray([
        Rx.Observable.return('one'),
        Rx.Observable.return('two')
    ])
    .subscribe(
        console.log.bind(console),
        err => console.log(`Error: ${err}`)
    );

// => ['one', 'two']


//Using an object literal can also be achieved with a little bit more work, but totally reasonable. Instead of just returning the observable in flatMap, we'll add a property to a new object which will contain our key moving forward. Then, we'll call reduce much as before, copying the values to a new object, and then plucking the value from each time it comes through and adding it to our final object.

var Rx = require('rx');

function wrapObject (obj) {
    var keys = Object.keys(obj),
        hasOwnProperty = {}.hasOwnProperty;

    return Rx.Observable
        .fromArray(keys)
        .flatMap(key => {

            return obj[key].map(x => {
                var newObj = {};
                newObj[key] = x;
                return newObj;
            });
        })
        .reduce((acc, x) => {
            var newObj = {};
            for (var prop in acc) {
                if(!hasOwnProperty.call(acc)) {
                    newObj[prop] = acc[prop];
                }
            }

            var xKey = Object.keys(x)[0];
            newObj[xKey] = x[xKey];

            return newObj;
        }, {});
}

wrapObject({
        one: Rx.Observable.return(1),
        two: Rx.Observable.return(2)
    })
    .subscribe(
        console.log.bind(console),
        err => console.log(`Error: ${err}`)
    );

// => { one: 1, two: 2 }
