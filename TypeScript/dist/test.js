"use strict";
function hello(compiler) {
    console.log("Hello from " + compiler);
}
hello("TypeScriptStart");
function buildName(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var buildNameFun = buildName;

//# sourceMappingURL=maps/test.js.map
