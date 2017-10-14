  var _id = 0;

  function getElementsByClassName(searchClass, node, tag) {
      if (document.getElementsByClassName) {
          return (node || document).getElementsByClassName(searchClass);
      } else {
          node = node || document;
          tag = tag || '*';
          var returnElements = [];
          var els = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag);
          var i = els.length;
          searchClass = searchClass.replace(/\-/g, "\\-");
          var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
          while (--i >= 0) {
              if (pattern.test(els[i].className)) {
                  returnElements.unshift(els[i]);
              }
          }
          return returnElements;
      }
  }

  function removeClass(obj, className) {
      if (!obj.className) return;
      var classNameList = obj.className.split(' ');
      for (var i = 0; i < classNameList.length; i++) {
          if (classNameList[i] === className) {
              classNameList.splice(i, 1);
              break;
          }
      }
      obj.className = classNameList.join(' ');

  }

  function hasClass(obj, cls) {
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function addClass(obj, cls) {
      if (!hasClass(obj, cls)) obj.className += " " + cls;
  }

  function toggleClass(obj, cls) {
      if (hasClass(obj, cls)) {
          removeClass(obj, cls);
      } else {
          addClass(obj, cls);
      }
  }


  function random(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function inherit(child, parent) {
      var F = function() {};
      F.prototype = parent.prototype;
      child.prototype = new F();
      child.prototype.constructor = child;
      child['super'] = parent.prototype;
  }

  function deepCopy(p, c) {　　　　
      var c = c || {};　　　　
      for (var i in p) {
          if (typeof p[i] === 'object') {
              c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
              deepCopy(p[i], c[i]);
          } else {
              c[i] = p[i];
          }
      }
      return c;
  }


  module.exports = {
      "random": random,
      "inherit": inherit,
      "deepCopy": deepCopy,
      "hasClass": hasClass,
      "addClass": addClass,
      "removeClass": removeClass,
      "toggleClass": toggleClass,
      "newId": function(pre) {
          return (pre || "util") + _id++;
      },
      "$$": function(id) {
          return document.getElementById(id);
      },
      "$": function(searchClass, node, tag) {
          var result = getElementsByClassName(searchClass, node, tag);
          if (result.length == 1) return result[0];
          return result;
      },
      "transitionCheck": function() {
          var thisBody = document.body || document.documentElement,
              thisStyle = thisBody.style,
              support = thisStyle.transition !== undefined ||
              thisStyle.WebkitTransition !== undefined ||
              thisStyle.MozTransition !== undefined ||
              thisStyle.MsTransition !== undefined ||
              thisStyle.OTransition !== undefined;
          return support;
      },
      "ie6": !-[1, ] && !window.XMLHttpRequest
  };