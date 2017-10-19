"use strict";
/// <reference path="Validation.ts" />
var Validation;
/// <reference path="Validation.ts" />
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));

//# sourceMappingURL=../maps/MultiFileNameSpaces/LettersOnlyValidator.js.map
