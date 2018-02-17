'use strict';

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 简洁表示法
  var o = 1;
  var k = 2;
  var es5 = {
    o: o,
    k: k
  };
  var es6 = {
    o: o,
    k: k
  };
  console.log(es5, es6);

  var es5_method = {
    hello: function hello() {
      console.log('hello');
    }
  };
  var es6_method = {
    hello: function hello() {
      console.log('hello');
    }
  };
  console.log(es5_method.hello(), es6_method.hello());
}

{
  // 属性表达式
  var a = 'b';
  var es5_obj = {
    a: 'c',
    b: 'c'
  };

  var es6_obj = (0, _defineProperty3.default)({}, a, 'c');

  console.log(es5_obj, es6_obj);
}

{
  // 新增API
  console.log('字符串', (0, _is2.default)('abc', 'abc'), 'abc' === 'abc');
  console.log('数组', (0, _is2.default)([], []), [] === []);

  console.log('拷贝', (0, _assign2.default)({ a: 'a' }, { b: 'b' }));

  var test = { k: 123, o: 456 };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(test)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];

      console.log([key, value]);
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
  // 扩展运算符
  // let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  // c={
  //   c:'ddd',
  //   d:'ccc'
  // }
}
//# sourceMappingURL=对象扩展.js.map