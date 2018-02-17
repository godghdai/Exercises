'use strict';

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // 基本定义和生成实例
  var Parent = function Parent() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
    (0, _classCallCheck3.default)(this, Parent);

    this.name = name;
  };

  var v_parent = new Parent('v');
  console.log('构造函数和实例', v_parent);
}

{
  // 继承
  var _Parent = function _Parent() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
    (0, _classCallCheck3.default)(this, _Parent);

    this.name = name;
  };

  var Child = function (_Parent2) {
    (0, _inherits3.default)(Child, _Parent2);

    function Child() {
      (0, _classCallCheck3.default)(this, Child);
      return (0, _possibleConstructorReturn3.default)(this, (Child.__proto__ || (0, _getPrototypeOf2.default)(Child)).apply(this, arguments));
    }

    return Child;
  }(_Parent);

  console.log('继承', new Child());
}

{
  // 继承传递参数
  var _Parent3 = function _Parent3() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
    (0, _classCallCheck3.default)(this, _Parent3);

    this.name = name;
  };

  var _Child = function (_Parent4) {
    (0, _inherits3.default)(_Child, _Parent4);

    function _Child() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'child';
      (0, _classCallCheck3.default)(this, _Child);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Child.__proto__ || (0, _getPrototypeOf2.default)(_Child)).call(this, name));

      _this2.type = 'child';
      return _this2;
    }

    return _Child;
  }(_Parent3);

  console.log('继承传递参数', new _Child('hello'));
}

{
  // getter,setter
  var _Parent5 = function () {
    function _Parent5() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
      (0, _classCallCheck3.default)(this, _Parent5);

      this.name = name;
    }

    (0, _createClass3.default)(_Parent5, [{
      key: 'longName',
      get: function get() {
        return 'mk' + this.name;
      },
      set: function set(value) {
        this.name = value;
      }
    }]);
    return _Parent5;
  }();

  var v = new _Parent5();
  console.log('getter', v.longName);
  v.longName = 'hello';
  console.log('setter', v.longName);
}

{
  // 静态方法
  var _Parent6 = function () {
    function _Parent6() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
      (0, _classCallCheck3.default)(this, _Parent6);

      this.name = name;
    }

    (0, _createClass3.default)(_Parent6, null, [{
      key: 'tell',
      value: function tell() {
        console.log('tell');
      }
    }]);
    return _Parent6;
  }();

  _Parent6.tell();
}

{
  // 静态属性
  var _Parent7 = function () {
    function _Parent7() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mukewang';
      (0, _classCallCheck3.default)(this, _Parent7);

      this.name = name;
    }

    (0, _createClass3.default)(_Parent7, null, [{
      key: 'tell',
      value: function tell() {
        console.log('tell');
      }
    }]);
    return _Parent7;
  }();

  _Parent7.type = 'test';

  console.log('静态属性', _Parent7.type);
}
//# sourceMappingURL=类和对象.js.map