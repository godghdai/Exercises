"use strict";
/// <reference path="Validation.ts" />
var Validation;
/// <reference path="Validation.ts" />
(function (Validation) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));

//# sourceMappingURL=../maps/MultiFileNameSpaces/ZipCodeValidator.js.map
