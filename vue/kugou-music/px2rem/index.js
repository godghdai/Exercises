'use strict';

var cssparse = require('css');
var postcss = require('postcss');
var pxRegExp = /\b(\d+(\.\d+)?)pxx\b/;
var fontsize = 40;

module.exports = postcss.plugin('postcss-px2rem', function(options) {
  return function(css, result) {
    fontsize = options.fontsize || fontsize;
    var oldCssText = css.toString();
    var astObj = cssparse.parse(oldCssText);
    processRules(astObj.stylesheet.rules);
    var newCssText=cssparse.stringify(astObj);
    var newCssObj = postcss.parse(newCssText);
    result.root = newCssObj;
  };
});

function processRules(rules) {
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (rule.type === 'media') {
      processRules(rule.rules); // recursive invocation while dealing with media queries
      continue;
    } else if (rule.type === 'keyframes') {
      processRules(rule.keyframes); // recursive invocation while dealing with keyframes
      continue;
    } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
      continue;
    }

    var declarations = rule.declarations;
    for (var j = 0; j < declarations.length; j++) {
      var declaration = declarations[j];
      // need transform: declaration && has 'pxx'
      if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
        declaration.value = getCalcValue(declaration.value); // common transform
      }
    }
  }
}

function getCalcValue(value) {
  var content = value.replace(/(\d+)pxx/g, function(s, t) {
    s = s.replace('pxx', '');
    var value = parseInt(s, 10) / fontsize;
    return value + "rem";
  });
  return content;
}

