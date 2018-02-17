'use strict';

var _has = require('babel-runtime/core-js/reflect/has');

var _has2 = _interopRequireDefault(_has);

var _set = require('babel-runtime/core-js/reflect/set');

var _set2 = _interopRequireDefault(_set);

var _get = require('babel-runtime/core-js/reflect/get');

var _get2 = _interopRequireDefault(_get);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };

  var monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get: function get(target, key) {
      return target[key].replace('2017', '2018');
    },

    // 拦截对象设置属性
    set: function set(target, key, value) {
      if (key === 'name') {
        return target[key] = value;
      } else {
        return target[key];
      }
    },

    // 拦截key in object操作
    has: function has(target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return false;
      }
    },

    // 拦截delete
    deleteProperty: function deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        delete target[key];
        return true;
      } else {
        return target[key];
      }
    },

    // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys: function ownKeys(target) {
      return (0, _keys2.default)(target).filter(function (item) {
        return item != 'time';
      });
    }
  });

  console.log('get', monitor.time);

  monitor.time = '2018';
  monitor.name = 'mukewang';
  console.log('set', monitor.time, monitor);

  console.log('has', 'name' in monitor, 'time' in monitor);

  // delete monitor.time;
  // console.log('delete',monitor);
  //
  // delete monitor._r;
  // console.log('delete',monitor);
  console.log('ownKeys', (0, _keys2.default)(monitor));
}

{
  var _obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  };

  console.log('Reflect get', (0, _get2.default)(_obj, 'time'));
  (0, _set2.default)(_obj, 'name', 'mukewang');
  console.log(_obj);
  console.log('has', (0, _has2.default)(_obj, 'name'));
}
//# sourceMappingURL=Proxy和Reflect.js.map