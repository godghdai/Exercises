'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 基本定义
  var ajax = function ajax(callback) {
    console.log('执行');
    setTimeout(function () {
      callback && callback.call();
    }, 1000);
  };
  ajax(function () {
    console.log('timeout1');
  });
}

{
  var _ajax = function _ajax() {
    console.log('执行2');
    return new _promise2.default(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };

  _ajax().then(function () {
    console.log('promise', 'timeout2');
  });
}

{
  var _ajax2 = function _ajax2() {
    console.log('执行3');
    return new _promise2.default(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };

  _ajax2().then(function () {
    return new _promise2.default(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 2000);
    });
  }).then(function () {
    console.log('timeout3');
  });
}

{
  var _ajax3 = function _ajax3(num) {
    console.log('执行4');
    return new _promise2.default(function (resolve, reject) {
      if (num > 5) {
        resolve();
      } else {
        throw new Error('出错了');
      }
    });
  };

  _ajax3(6).then(function () {
    console.log('log', 6);
  }).catch(function (err) {
    console.log('catch', err);
  });

  _ajax3(3).then(function () {
    console.log('log', 3);
  }).catch(function (err) {
    console.log('catch', err);
  });
}
//# sourceMappingURL=Promise.js.map