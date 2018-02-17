'use strict';

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _is = require('babel-runtime/core-js/object/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 简洁表示法
  let o = 1;
  let k = 2;
  let es5 = {
    o: o,
    k: k
  };
  let es6 = {
    o,
    k
  };
  console.log(es5, es6);

  let es5_method = {
    hello: function () {
      console.log('hello');
    }
  };
  let es6_method = {
    hello() {
      console.log('hello');
    }
  };
  console.log(es5_method.hello(), es6_method.hello());
}

{
  // 属性表达式
  let a = 'b';
  let es5_obj = {
    a: 'c',
    b: 'c'
  };

  let es6_obj = {
    [a]: 'c'
  };

  console.log(es5_obj, es6_obj);
}

{
  // 新增API
  console.log('字符串', (0, _is2.default)('abc', 'abc'), 'abc' === 'abc');
  console.log('数组', (0, _is2.default)([], []), [] === []);

  console.log('拷贝', (0, _assign2.default)({ a: 'a' }, { b: 'b' }));

  let test = { k: 123, o: 456 };
  for (let [key, value] of (0, _entries2.default)(test)) {
    console.log([key, value]);
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