'use strict';

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var a = void 0,
      b = void 0,
      rest = void 0;
  a = 1;
  b = 2;

  console.log(a, b);
}

{
  var _a = void 0,
      _b = void 0,
      _rest = void 0;
  _a = 1;
  _b = 2;
  _rest = [3, 4, 5, 6];

  console.log(_a, _b, _rest);
}

{
  var _a2 = void 0,
      _b2 = void 0;
  var _a$b = { a: 1, b: 2 };
  _a2 = _a$b.a;
  _b2 = _a$b.b;

  console.log(_a2, _b2);
}

{
  var _a3 = void 0,
      _b3 = void 0,
      c = void 0,
      _rest2 = void 0;
  var _ref = [1, 2];
  _a3 = _ref[0];
  _b3 = _ref[1];
  var _ref$ = _ref[2];
  c = _ref$ === undefined ? 3 : _ref$;

  console.log(_a3, _b3, c);
}

{
  var _a4 = 1;
  var _b4 = 2;
  var _ref2 = [_b4, _a4];
  _a4 = _ref2[0];
  _b4 = _ref2[1];

  console.log(_a4, _b4);
}

{
  var f = function f() {
    return [1, 2];
  };

  var _a5 = void 0,
      _b5 = void 0;

  var _f = f();

  var _f2 = (0, _slicedToArray3.default)(_f, 2);

  _a5 = _f2[0];
  _b5 = _f2[1];

  console.log(_a5, _b5);
}

{
  var _f3 = function _f3() {
    return [1, 2, 3, 4, 5];
  };

  var _a6 = void 0,
      _b6 = void 0,
      _c = void 0;

  var _f4 = _f3();

  var _f5 = (0, _slicedToArray3.default)(_f4, 4);

  _a6 = _f5[0];
  _b6 = _f5[3];

  console.log(_a6, _b6);
}

{
  var _f6 = function _f6() {
    return [1, 2, 3, 4, 5];
  };

  var _a7 = void 0,
      _b7 = void 0,
      _c2 = void 0;

  var _f7 = _f6();

  var _f8 = (0, _toArray3.default)(_f7);

  _a7 = _f8[0];
  _b7 = _f8.slice(2);

  console.log(_a7, _b7);
}

{
  var o = { p: 42, q: true };
  var p = o.p,
      q = o.q;

  console.log(p, q);
}

{
  var _a9 = { a: 3 },
      _a9$a = _a9.a,
      _a8 = _a9$a === undefined ? 10 : _a9$a,
      _a9$b = _a9.b,
      _b8 = _a9$b === undefined ? 5 : _a9$b;

  console.log(_a8, _b8);
}

{
  var metaData = {
    title: 'abc',
    test: [{
      title: 'test',
      desc: 'description'
    }]
  };

  var esTitle = metaData.title,
      _metaData$test = (0, _slicedToArray3.default)(metaData.test, 1),
      cnTitle = _metaData$test[0].title;

  console.log(esTitle, cnTitle);
}
//# sourceMappingURL=解构赋值.js.map