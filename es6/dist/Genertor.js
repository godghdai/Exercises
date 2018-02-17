'use strict';

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  // genertaor基本定义
  let tell = function* () {
    yield 'a';
    yield 'b';
    return 'c';
  };

  let k = tell();

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  let obj = {};
  obj[_iterator2.default] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  for (let value of obj) {
    console.log('value', value);
  }
}

{
  let state = function* () {
    while (1) {
      yield 'A';
      yield 'B';
      yield 'C';
    }
  };
  let status = state();
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