'use strict';

var _raw = require('babel-runtime/core-js/string/raw');

var _raw2 = _interopRequireDefault(_raw);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _fromCodePoint = require('babel-runtime/core-js/string/from-code-point');

var _fromCodePoint2 = _interopRequireDefault(_fromCodePoint);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['i am ', ',', ''], ['i am ', ',', '']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['Hi\n', ''], ['Hi\\n', '']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  console.log('a', 'a');
  console.log('s', '\u20BB7');

  console.log('s', '\uD842\uDFB7');
}

{
  var s = '𠮷';
  console.log('length', s.length);
  console.log('0', s.charAt(0));
  console.log('1', s.charAt(1));
  console.log('at0', s.charCodeAt(0));
  console.log('at1', s.charCodeAt(1));

  var s1 = '𠮷a';
  console.log('length', s1.length);
  console.log('code0', s1.codePointAt(0));
  console.log('code0', s1.codePointAt(0).toString(16));
  console.log('code1', s1.codePointAt(1));
  console.log('code2', s1.codePointAt(2));
}

{
  console.log(String.fromCharCode("0x20bb7"));
  console.log((0, _fromCodePoint2.default)("0x20bb7"));
}

{
  var str = '\uD842\uDFB7abc';
  for (var i = 0; i < str.length; i++) {
    console.log('es5', str[i]);
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(str), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var code = _step.value;

      console.log('es6', code);
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
}

{
  var _str = "string";
  console.log('includes', _str.includes("c"));
  console.log('start', _str.startsWith('str'));
  console.log('end', _str.endsWith('ng'));
}

{
  var _str2 = "abc";
  console.log(_str2.repeat(2));
}

{
  var name = "list";
  var info = "hello world";
  var m = 'i am ' + name + ',' + info;
  console.log(m);
}

{
  console.log('1'.padStart(2, '0'));
  console.log('1'.padEnd(2, '0'));
}

{
  var abc = function abc(s, v1, v2) {
    console.log(s, v1, v2);
    return s + v1 + v2;
  };

  var user = {
    name: 'list',
    info: 'hello world'
  };
  console.log(abc(_templateObject, user.name, user.info));
}

{
  console.log((0, _raw2.default)(_templateObject2, 1 + 2));
  console.log('Hi\n' + (1 + 2));
}
//# sourceMappingURL=字符串扩展.js.map