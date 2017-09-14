define(function() {

    Function.prototype.bind = Function.prototype.bind || function(oThis) {
        if (typeof this !== 'function') {
              throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP ?
                    this :
                    oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };

    Array.prototype.forEach = Array.prototype.forEach || function(callback /*, thisArg*/ ) {
        var T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };

    Array.prototype.map = Array.prototype.map || function(callback /*, thisArg*/ ) {
        var T, A, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };

    Array.prototype.reduce = Array.prototype.reduce || function(callback /*, initialValue*/ ) {
        if (this === null) {
            throw new TypeError('Array.prototype.reduce ' +
                'called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback +
                ' is not a function');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (arguments.length >= 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in o)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array ' +
                    'with no initial value');
            }
            value = o[k++];
        }
        while (k < len) {
            value = callback(value, o[k], k, o);
            k++;
        }
        return value;
    };

    /*
    Object.prototype.keys=Object.prototype.keys|| function(){
       var keys=[];
        for (var attr in this) {
           keys.push(attr);
         }
        return keys;
    };*/


})