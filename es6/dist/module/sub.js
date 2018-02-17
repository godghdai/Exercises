'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;

exports.default = function (msg) {
  console.log(msg);
};

let A = exports.A = 123;

function test() {
  console.log('test');
}

let Hello = exports.Hello = class Hello {
  test() {
    console.log('class');
  }
};