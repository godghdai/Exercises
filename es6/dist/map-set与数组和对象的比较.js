'use strict';

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _map2 = require('babel-runtime/core-js/map');

var _map3 = _interopRequireDefault(_map2);

var _weakSet = require('babel-runtime/core-js/weak-set');

var _weakSet2 = _interopRequireDefault(_weakSet);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var list = new _set2.default();
  list.add(5);
  list.add(7);

  console.log('size', list.size);
}

{
  var arr = [1, 2, 3, 4, 5];
  var _list = new _set2.default(arr);

  console.log('size', _list.size);
}

{
  var _list2 = new _set2.default();
  _list2.add(1);
  _list2.add(2);
  _list2.add(1);

  console.log('list', _list2);

  var _arr = [1, 2, 3, 1, '2'];
  var list2 = new _set2.default(_arr);

  console.log('unique', list2);
}

{
  var _arr2 = ['add', 'delete', 'clear', 'has'];
  var _list3 = new _set2.default(_arr2);

  console.log('has', _list3.has('add'));
  console.log('delete', _list3.delete('add'), _list3);
  _list3.clear();
  console.log('list', _list3);
}

{
  var _arr3 = ['add', 'delete', 'clear', 'has'];
  var _list4 = new _set2.default(_arr3);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(_list4.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      console.log('keys', key);
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
    for (var _iterator2 = (0, _getIterator3.default)(_list4.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(_list4.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref = _step3.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var _key = _ref2[0];
      var _value = _ref2[1];

      console.log('entries', _key, _value);
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

  _list4.forEach(function (item) {
    console.log(item);
  });
}

{
  var weakList = new _weakSet2.default();

  var arg = {};

  weakList.add(arg);

  // weakList.add(2);

  console.log('weakList', weakList);
}

{
  var map = new _map3.default();
  var _arr4 = ['123'];

  map.set(_arr4, 456);

  console.log('map', map, map.get(_arr4));
}

{
  var _map = new _map3.default([['a', 123], ['b', 456]]);
  console.log('map args', _map);
  console.log('size', _map.size);
  console.log('delete', _map.delete('a'), _map);
  console.log('clear', _map.clear(), _map);
}

{
  var weakmap = new _weakMap2.default();

  var o = {};
  weakmap.set(o, 123);
  console.log(weakmap.get(o));
}
//# sourceMappingURL=map-set与数组和对象的比较.js.map