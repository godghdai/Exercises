'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export let A=123;
//
// export function test(){
//   console.log('test');
// }
//
// export class Hello{
//   test(){
//     console.log('class');
//   }
// }

var A = 123;
var test = function test() {
  console.log('test');
};

var Hello = function () {
  function Hello() {
    (0, _classCallCheck3.default)(this, Hello);
  }

  (0, _createClass3.default)(Hello, [{
    key: 'test',
    value: function test() {
      console.log('class');
    }
  }]);
  return Hello;
}();

exports.default = {
  A: A,
  test: test,
  Hello: Hello
};
//# sourceMappingURL=模块化.js.map