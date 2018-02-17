'use strict';

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _getOwnPropertySymbols = require('babel-runtime/core-js/object/get-own-property-symbols');

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _for = require('babel-runtime/core-js/symbol/for');

var _for2 = _interopRequireDefault(_for);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 声明
  var a1 = (0, _symbol2.default)();
  var a2 = (0, _symbol2.default)();
  console.log(a1 === a2);
  var a3 = (0, _for2.default)('a3');
  var a4 = (0, _for2.default)('a3');
  console.log(a3 === a4);
}

{
  var _obj;

  var _a = (0, _for2.default)('abc');
  var obj = (_obj = {}, (0, _defineProperty3.default)(_obj, _a, '123'), (0, _defineProperty3.default)(_obj, 'abc', 345), (0, _defineProperty3.default)(_obj, 'c', 456), _obj);
  console.log('obj', obj);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];

      console.log('let of', key, value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  (0, _getOwnPropertySymbols2.default)(obj).forEach(function (item) {
    console.log(obj[item]);
  });

  (0, _ownKeys2.default)(obj).forEach(function (item) {
    console.log('ownkeys', item, obj[item]);
  });
}
//# sourceMappingURL=Symbol用法.js.map