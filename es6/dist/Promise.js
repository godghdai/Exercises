'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 基本定义
  let ajax = function (callback) {
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
  let ajax = function () {
    console.log('执行2');
    return new _promise2.default(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };

  ajax().then(function () {
    console.log('promise', 'timeout2');
  });
}

{
  let ajax = function () {
    console.log('执行3');
    return new _promise2.default(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  };

  ajax().then(function () {
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
  let ajax = function (num) {
    console.log('执行4');
    return new _promise2.default(function (resolve, reject) {
      if (num > 5) {
        resolve();
      } else {
        throw new Error('出错了');
      }
    });
  };

  ajax(6).then(function () {
    console.log('log', 6);
  }).catch(function (err) {
    console.log('catch', err);
  });

  ajax(3).then(function () {
    console.log('log', 3);
  }).catch(function (err) {
    console.log('catch', err);
  });
}