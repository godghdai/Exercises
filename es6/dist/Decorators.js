'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

{
  var _desc, _value, _class;

  var readonly = function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
  };

  var Test = (_class = function () {
    function Test() {
      (0, _classCallCheck3.default)(this, Test);
    }

    (0, _createClass3.default)(Test, [{
      key: 'time',
      value: function time() {
        return '2017-03-11';
      }
    }]);
    return Test;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'time', [readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'time'), _class.prototype)), _class);


  var test = new Test();

  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}

{
  var _class2;

  var typename = function typename(target, name, descriptor) {
    target.myname = 'hello';
  };

  var _Test = typename(_class2 = function _Test() {
    (0, _classCallCheck3.default)(this, _Test);
  }) || _class2;

  console.log('类修饰符', _Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}
//# sourceMappingURL=Decorators.js.map