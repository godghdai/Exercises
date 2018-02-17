'use strict';

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  let arr = ['hello', 'world'];
  let map = (0, _getIterator3.default)(arr);
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
}

{
  let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [_iterator2.default]() {
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next() {
          if (index < len) {
            return {
              value: arr[index++],
              done: false
            };
          } else {
            return {
              value: arr[index++],
              done: true
            };
          }
        }
      };
    }
  };
  for (let key of obj) {
    console.log(key);
  }
}

{
  let arr = ['hello', 'world'];
  for (let value of arr) {
    console.log('value', value);
  }
}