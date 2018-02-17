'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

  let readonly = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
  };

  let Test = (_class = class Test {
    time() {
      return '2017-03-11';
    }
  }, (_applyDecoratedDescriptor(_class.prototype, 'time', [readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'time'), _class.prototype)), _class);


  let test = new Test();

  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}

{
  var _class2;

  let typename = function (target, name, descriptor) {
    target.myname = 'hello';
  };

  let Test = typename(_class2 = class Test {}) || _class2;

  console.log('类修饰符', Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}