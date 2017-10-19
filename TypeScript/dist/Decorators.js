System.register(["reflect-metadata"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    function f() {
        console.log("f(): evaluated");
        return function (target, propertyKey, descriptor) {
            console.log("f(): called");
        };
    }
    function g() {
        console.log("g(): evaluated");
        return function (target, propertyKey, descriptor) {
            console.log("g(): called");
        };
    }
    function classDecorator(constructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.newProperty = "new property";
                _this.hello = "override";
                return _this;
            }
            return class_1;
        }(constructor));
    }
    function format(formatString) {
        return Reflect.metadata(formatMetadataKey, formatString);
    }
    function getFormat(target, propertyKey) {
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }
    var C, Greeter, Greeter, formatMetadataKey;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            C = /** @class */ (function () {
                function C() {
                }
                C.prototype.method = function () { };
                __decorate([
                    f(),
                    g()
                ], C.prototype, "method");
                return C;
            }());
            Greeter = /** @class */ (function () {
                function Greeter(m) {
                    this.property = "property";
                    this.hello = m;
                }
                Greeter = __decorate([
                    classDecorator
                ], Greeter);
                return Greeter;
            }());
            console.log(new Greeter("world"));
            Greeter = /** @class */ (function () {
                function Greeter(message) {
                    this.greeting = message;
                }
                Greeter.prototype.greet = function () {
                    return "Hello, " + this.greeting;
                };
                __decorate([
                    enumerable(false)
                ], Greeter.prototype, "greet");
                return Greeter;
            }());
            We;
            can;
            define;
            the;
            decorator;
            using;
            the;
            following;
            enumerable(value, boolean);
            {
                return function (target, propertyKey, descriptor) {
                    descriptor.enumerable = value;
                };
            }
            formatMetadataKey = Symbol("format");
        }
    };
});

//# sourceMappingURL=maps/Decorators.js.map
