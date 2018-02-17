"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
	let a = { "a": 1, "b": 2 };
	let b = (0, _extends3.default)({
		c: "c"
	}, a);
	console.log((0, _extends3.default)({}, a, b));
}