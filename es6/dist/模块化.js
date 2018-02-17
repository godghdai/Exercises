'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

let A = 123;
let test = function () {
  console.log('test');
};
let Hello = class Hello {
  test() {
    console.log('class');
  }
};
exports.default = {
  A,
  test,
  Hello
};