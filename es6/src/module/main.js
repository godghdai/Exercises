import msg from "./sub";
import * as mod from "./sub";
import { Hello,A as B } from "./sub";
/*
import { Hello as HelloAlias } from "module-name";
import { test , A } from "module-name";
import { export1 , export2 as alias2 } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
*/
console.log(mod.A);
msg("test msg");

new Hello().test();