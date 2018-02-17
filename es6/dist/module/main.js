"use strict";

var _sub = require("./sub");

var mod = _interopRequireWildcard(_sub);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
import { Hello as HelloAlias } from "module-name";
import { test , A } from "module-name";
import { export1 , export2 as alias2 } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
*/
console.log(mod.A);
(0, mod.default)("test msg");

new _sub.Hello().test();