'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // genertaor基本定义
  var tell = /*#__PURE__*/_regenerator2.default.mark(function tell() {
    return _regenerator2.default.wrap(function tell$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return 'a';

          case 2:
            _context.next = 4;
            return 'b';

          case 4:
            return _context.abrupt('return', 'c');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, tell, this);
  });

  var k = tell();

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  var obj = {};
  obj[_iterator3.default] = /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return 1;

          case 2:
            _context2.next = 4;
            return 2;

          case 4:
            _context2.next = 6;
            return 3;

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this);
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      console.log('value', value);
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
  var state = /*#__PURE__*/_regenerator2.default.mark(function state() {
    return _regenerator2.default.wrap(function state$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!1) {
              _context3.next = 9;
              break;
            }

            _context3.next = 3;
            return 'A';

          case 3:
            _context3.next = 5;
            return 'B';

          case 5:
            _context3.next = 7;
            return 'C';

          case 7:
            _context3.next = 0;
            break;

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, state, this);
  });
  var status = state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}

// {
//   let state=async function (){
//     while(1){
//       await 'A';
//       await 'B';
//       await 'C';
//     }
//   }
//   let status=state();
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }
//# sourceMappingURL=Genertor.js.map