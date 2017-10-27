
/*
async.compose

The async.compose method creates a function which is a composition of the passed asynchronous functions. Each function consumes the return value of the function that follows. Composing functions f(), g() and h() would produce the result of f(g(h())), only this version uses callbacks to obtain the return values.

Each function is executed with the this binding of the composed function.

async version

In this example, we'll chain together two functions, one to add 1 to a supplied argument, and then chain it to another to multiply the result by 3.
*/
var async = require('async');

function add1(n, callback) {
    setTimeout(() => callback(null, n + 1), 10);
}

function mul3(n, callback) {
    setTimeout(() => callback(null, n * 3), 10);
}

var add1mul3 = async.compose(mul3, add1);

add1mul3(4, (err, result) => console.log(result));

// => 15
/*
RxJS version

Using RxJS, we can accomplish this using the usual composition operator selectMany or flatMap. We'll wrap the setTimeout with a wrapTimeout method and ensure that we do deterministic cleanup via clearTimeout. Then we can compose together our add1 and mul3 functions which result in observable sequences.
*/
var Rx = require('rx');

function wrapTimeout (fn, arg) {
    return Rx.Observable.create(obs => {

        // Ensure the composition of the this argument
        var id = setTimeout(() => {
            obs.onNext(fn.call(fn, arg));
            obs.onCompleted();
        }, 10);

        // Handle cleanup/early disposal
        return () => clearTimeout(id)
    });
}

function add1 (n) {
    return wrapTimeout(x => x + 1, n);
}

function mul3 (n) {
    return wrapTimeout(x => x * 3, n);
}

add1(4)
    .flatMap(mul3)
    .subscribe(
        console.log.bind(console),
        err => console.log(`Error: ${e}`)
    );
// => 15