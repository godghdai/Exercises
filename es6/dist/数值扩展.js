'use strict';

var _cbrt = require('babel-runtime/core-js/math/cbrt');

var _cbrt2 = _interopRequireDefault(_cbrt);

var _sign = require('babel-runtime/core-js/math/sign');

var _sign2 = _interopRequireDefault(_sign);

var _trunc = require('babel-runtime/core-js/math/trunc');

var _trunc2 = _interopRequireDefault(_trunc);

var _isSafeInteger = require('babel-runtime/core-js/number/is-safe-integer');

var _isSafeInteger2 = _interopRequireDefault(_isSafeInteger);

var _minSafeInteger = require('babel-runtime/core-js/number/min-safe-integer');

var _minSafeInteger2 = _interopRequireDefault(_minSafeInteger);

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  console.log('B', 503);
  console.log(503);
}

{
  console.log('15', (0, _isFinite2.default)(15));
  console.log('NaN', (0, _isFinite2.default)(NaN));
  console.log('1/0', (0, _isFinite2.default)('true' / 0));
  console.log('NaN', (0, _isNan2.default)(NaN));
  console.log('0', (0, _isNan2.default)(0));
}

{
  console.log('25', (0, _isInteger2.default)(25));
  console.log('25.0', (0, _isInteger2.default)(25.0));
  console.log('25.1', (0, _isInteger2.default)(25.1));
  console.log('25.1', (0, _isInteger2.default)('25'));
}

{
  console.log(_maxSafeInteger2.default, _minSafeInteger2.default);
  console.log('10', (0, _isSafeInteger2.default)(10));
  console.log('a', (0, _isSafeInteger2.default)('a'));
}

{
  console.log(4.1, (0, _trunc2.default)(4.1));
  console.log(4.9, (0, _trunc2.default)(4.9));
}

{
  console.log('-5', (0, _sign2.default)(-5));
  console.log('0', (0, _sign2.default)(0));
  console.log('5', (0, _sign2.default)(5));
  console.log('50', (0, _sign2.default)('50'));
  console.log('foo', (0, _sign2.default)('foo'));
}

{
  console.log('-1', (0, _cbrt2.default)(-1));
  console.log('8', (0, _cbrt2.default)(8));
}
//# sourceMappingURL=数值扩展.js.map