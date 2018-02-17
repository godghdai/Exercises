'use strict';

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _getOwnPropertySymbols = require('babel-runtime/core-js/object/get-own-property-symbols');

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _for = require('babel-runtime/core-js/symbol/for');

var _for2 = _interopRequireDefault(_for);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 声明
  let a1 = (0, _symbol2.default)();
  let a2 = (0, _symbol2.default)();
  console.log(a1 === a2);
  let a3 = (0, _for2.default)('a3');
  let a4 = (0, _for2.default)('a3');
  console.log(a3 === a4);
}

{
  let a1 = (0, _for2.default)('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
  };
  console.log('obj', obj);

  for (let [key, value] of (0, _entries2.default)(obj)) {
    console.log('let of', key, value);
  }

  (0, _getOwnPropertySymbols2.default)(obj).forEach(function (item) {
    console.log(obj[item]);
  });

  (0, _ownKeys2.default)(obj).forEach(function (item) {
    console.log('ownkeys', item, obj[item]);
  });
}