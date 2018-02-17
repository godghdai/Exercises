'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _of = require('babel-runtime/core-js/array/of');

var _of2 = _interopRequireDefault(_of);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  let arr = (0, _of2.default)(3, 4, 7, 9, 11);
  console.log('arr=', arr);

  let empty = (0, _of2.default)();
  console.log('empty', empty);
}

{
  let p = document.querySelectorAll('p');
  let pArr = (0, _from2.default)(p);
  pArr.forEach(function (item) {
    console.log(item.textContent);
  });

  console.log((0, _from2.default)([1, 3, 5], function (item) {
    return item * 2;
  }));
}

{
  console.log('fill-7', [1, 'a', undefined].fill(7));
  console.log('fill,pos', ['a', 'b', 'c'].fill(7, 1, 3));
}

{
  for (let index of ['1', 'c', 'ks'].keys()) {
    console.log('keys', index);
  }
  for (let value of ['1', 'c', 'ks'].values()) {
    console.log('values', value);
  }
  for (let [index, value] of ['1', 'c', 'ks'].entries()) {
    console.log('values', index, value);
  }
}

{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
}

{
  console.log([1, 2, 3, 4, 5, 6].find(function (item) {
    return item > 3;
  }));
  console.log([1, 2, 3, 4, 5, 6].findIndex(function (item) {
    return item > 3;
  }));
}

{
  console.log('number', [1, 2, NaN].includes(1));
  console.log('number', [1, 2, NaN].includes(NaN));
}