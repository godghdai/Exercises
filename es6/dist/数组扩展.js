'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _of = require('babel-runtime/core-js/array/of');

var _of2 = _interopRequireDefault(_of);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var arr = (0, _of2.default)(3, 4, 7, 9, 11);
  console.log('arr=', arr);

  var empty = (0, _of2.default)();
  console.log('empty', empty);
}

{
  var p = document.querySelectorAll('p');
  var pArr = (0, _from2.default)(p);
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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(['1', 'c', 'ks'].keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var index = _step.value;

      console.log('keys', index);
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(['1', 'c', 'ks'].values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      console.log('values', value);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(['1', 'c', 'ks'].entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref = _step3.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var _index = _ref2[0];
      var _value = _ref2[1];

      console.log('values', _index, _value);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
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
//# sourceMappingURL=数组扩展.js.map