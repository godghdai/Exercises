'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _iterator3 = require('babel-runtime/core-js/symbol/iterator');

var _iterator4 = _interopRequireDefault(_iterator3);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var arr = ['hello', 'world'];
  var map = (0, _getIterator3.default)(arr);
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
}

{
  var obj = (0, _defineProperty3.default)({
    start: [1, 3, 2],
    end: [7, 9, 8]
  }, _iterator4.default, function () {
    var self = this;
    var index = 0;
    var arr = self.start.concat(self.end);
    var len = arr.length;
    return {
      next: function next() {
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
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      console.log(key);
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
}

{
  var _arr = ['hello', 'world'];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(_arr), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var value = _step2.value;

      console.log('value', value);
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
}
//# sourceMappingURL=Iterator.js.map