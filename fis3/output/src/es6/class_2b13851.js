"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _obj,_obj2,_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),_get=function e(t,r,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,r);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,o)}if("value"in n)return n.value;var u=n.get;return void 0===u?void 0:u.call(o)},SkinnedMesh=function(e){function t(e,r){_classCallCheck(this,t);var o=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return o.idMatrix=t.defaultMatrix(),o.bones=[],o.boneMatrices=[],o}return _inherits(t,e),_createClass(t,[{key:"update",value:function(){_get(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"update",this).call(this)}}],[{key:"defaultMatrix",value:function(){return new THREE.Matrix4}}]),t}(THREE.Mesh),obj=(_obj2={__proto__:theProtoObj},_obj2.__proto__=somethingElse,_defineProperty(_obj2,"handler",handler),_defineProperty(_obj2,"toString",function(){return"d "+_get(_obj.__proto__||Object.getPrototypeOf(_obj),"toString",this).call(this)}),_defineProperty(_obj2,"prop_"+function(){return 42}(),42),_obj=_obj2);