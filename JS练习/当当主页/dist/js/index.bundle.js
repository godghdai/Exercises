/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

   var Util = __webpack_require__(0);
   var DefaultConfig = {
       "titles": "title",
       "head": "head",
       "autoPlay": false,
       "interval": 2000
   };

   function Tab(config) {
       this.config = Util.deepCopy(config, Util.deepCopy(DefaultConfig));
       this.cur_index = 0;
       this.con = null;
       this.titles = null;
       this.contents = null;
       this.autoPlayTimer = null;
       this.isAutoPlay = this.config.autoPlay;
       this.interval = this.config.interval;
       this.init();
   }

   Tab.prototype.init = function() {
       var config = this.config;
       var con = this.con = Util.$$(config.con);
       this.titles = Util.$(config.titles, Util.$(config.head, con));
       this.contents = Util.$(config.contents, con);
       this.initComplete();

       this.initUI();
       this.initEvent();

   }
   Tab.prototype.initUI = function() {
       for (var i = 0; i < this.titles.length; i++) {
           Util.removeClass(this.titles[i], "active");
           this.contents[i].style.display = 'none';
       }
       Util.addClass(this.titles[this.cur_index], "active");
       this.contents[this.cur_index].style.display = 'block';
       this.initUIComplete();
   }
   Tab.prototype.focus = function(newindex) {
       if (newindex == this.cur_index) return;
       this.contents[this.cur_index].style.display = 'none';
       this.contents[newindex].style.display = 'block';

       Util.removeClass(this.titles[this.cur_index], "active");
       Util.addClass(this.titles[newindex], "active");
       this.cur_index = newindex;
   }
   Tab.prototype.getCurrentContent = function() {
       return this.contents[this.cur_index];
   }
   Tab.prototype.initEvent = function() {
       var self = this;
       var titles = this.titles;
       for (var i = 0; i < titles.length; i++) {
           titles[i].index = i;
           titles[i].onmouseover = function() {
               self.focus(this.index);
           }
       }
       this.initEventComplete();

       if (this.isAutoPlay) {

           this.con.onmouseover = function() {
               self.stopPlay();
           }
           this.con.onmouseout = function() {
               self.autoPlay();
           }
           this.autoPlay();
       }
   }
   Tab.prototype.next = function() {
       var next = this.cur_index + 1;
       if (next > this.contents.length - 1) {
           next = 0;
       }
       this.focus(next);
   }
   Tab.prototype.prev = function() {
       var prev = this.cur_index - 1;
       if (prev < 0) {
           prev = this.contents.length - 1;
       }
       this.focus(prev);
   }
   Tab.prototype.stopPlay = function() {
       clearInterval(this.autoPlayTimer);
   }
   Tab.prototype.autoPlay = function() {
       var self = this;
       this.autoPlayTimer = setInterval(function() {
           self.next();
       }, this.interval);
   }
   Tab.prototype.initComplete = function() {}
   Tab.prototype.initEventComplete = function() {}
   Tab.prototype.initUIComplete = function() {}

   module.exports = Tab;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var EaseFunDic = {
    easeOutBack: function(t, b, c, d, s) {
        var s = 1.35;
        // if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeOutCubic: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    linear: function(t, b, c, d) { return c * t / d + b; }
}
var DefaultConfig = {
    "easeFun": "easeOutCubic",
    "pageNum": 1,
    "itemWidth": 200,
    "bannerID": "buy_now_scroll_banner",
    "wrapClassName": "buy_now_scroll_banner_wrap",
    "itemClassName": "product",
    "circlesClassName": "circle_con",
    "steps": 60,
    "autoPlay": false,
    "interval": 2000
}

function ScrollBanner(config) {
    this.config = Util.deepCopy(config, Util.deepCopy(DefaultConfig));
    this.animateTimer = null;
    this.isAutoPlay = this.config.autoPlay;
    this.autoPlayTimer = null;
    this.interval = this.config.interval;
    this.pageNum = this.config.pageNum;
    this.itemWidth = this.config.itemWidth;
    this.pageWidth = this.config.pageNum * this.config.itemWidth;
    this.pageTotal = 0;
    this.QueueOpt = [];
    this.QueueStatus = "stop";
    this.isRuningAnimate = false;
    this.items = null;
    this.scroll_banner = null;
    this.scroll_wrap = null;
    this.prev_button = null;
    this.next_button = null;
    this.cur_index = 0;
    this.isHaveCircles = false;
    this.circles_con = null;
    this.circles = null;
    this.init();
}
ScrollBanner.prototype.init = function() {
    var scroll_banner = this.scroll_banner = Util.$$(this.config.bannerID);
    this.scroll_wrap = Util.$(this.config.wrapClassName, scroll_banner);
    this.prev_button = Util.$("prev", scroll_banner);
    this.next_button = Util.$("next", scroll_banner);
    this.circles_con = Util.$(this.config.circlesClassName, scroll_banner);

    if (this.circles_con.childNodes) {
        this.isHaveCircles = true;
        this.circles = this.circles_con.getElementsByTagName("li");
    }

    //console.log(this.config.bannerID);
    this.initUI();
    this.initEvent();
}
ScrollBanner.prototype.initUI = function() {
    var items = Array.prototype.slice.call(Util.$(this.config.itemClassName, this.scroll_wrap));
    //页数大于1 复制节点
    if (items.length / this.pageNum > 1) {
        var start5 = items.slice(0, this.pageNum);
        var end5 = items.slice(-this.pageNum);
        for (var i = 0; i < this.pageNum; i++) {
            this.scroll_wrap.appendChild(start5[i].cloneNode(true));
            this.scroll_wrap.insertBefore(end5[this.pageNum - 1 - i].cloneNode(true), this.scroll_wrap.childNodes[0]);
        }
    }
    this.scroll_wrap.style.position = "absolute";
    this.scroll_wrap.style.left = -this.pageWidth + "px";
    this.pageTotal = items.length / this.pageNum + 2;
    this.prev_button.style.display = 'none';
    this.next_button.style.display = 'none';
    this.items = Util.$(this.config.itemClassName, this.scroll_wrap);
    this.scroll_wrap.style.width = this.items.length * this.pageWidth + "px";

    if (this.isHaveCircles) {
        for (var i = 0; i < this.circles.length; i++) {
            Util.removeClass(this.circles[i], "active");
        }
        Util.addClass(this.circles[this.cur_index], "active");
    }

}
ScrollBanner.prototype.initEvent = function() {
    var self = this;
    this.scroll_banner.onmouseover = function() {
        self.prev_button.style.display = 'block';
        self.next_button.style.display = 'block';
        self.stopPlay();
    }
    this.scroll_banner.onmouseout = function() {
        self.prev_button.style.display = 'none';
        self.next_button.style.display = 'none';
        self.autoPlay();
    }

    this.prev_button.onclick = function() {
        //self.QueueOpt.push("prev");
        //self.startQueue();
        self.prev();
    }
    this.next_button.onclick = function() {
        //self.QueueOpt.push("next");
        //self.startQueue();
        self.next();
    }

    this.autoPlay();


}
ScrollBanner.prototype.startQueue = function() {
    if (this.QueueStatus == "runing") return;
    this.QueueStatus = "runing";
    this.runQueue();
}
ScrollBanner.prototype.runQueue = function() {
    if (this.QueueOpt.length == 0) {
        this.QueueStatus = "stop";
        return;
    }
    var opt = this.QueueOpt.shift();
    if (opt == "prev") this.prev();
    else this.next();
}
ScrollBanner.prototype.focusCircle = function(newOffsetLeft) {

    if (!this.isHaveCircles) return;

    var index = Math.abs(newOffsetLeft) / this.itemWidth;
    var cur_index = 0;
    if (index == 0) {
        cur_index = this.circles.length - 1;
    } else if (index == this.items.length - 1) {
        cur_index = 0;
    } else cur_index = index - 1;

    var active = Util.$("active", this.circles_con);
    if (active) Util.removeClass(active, "active");

    Util.addClass(this.circles[cur_index], "active");
    this.cur_index = cur_index;
}
ScrollBanner.prototype.animateComplete = function() {

}
ScrollBanner.prototype.prev = function() {

    if (this.isRuningAnimate) return;

    var prevLeft = this.scroll_wrap.offsetLeft + this.pageWidth;
    if (prevLeft == this.pageWidth) {
        this.scroll_wrap.style.left = -(this.pageTotal - 2) * this.pageWidth + "px";
        prevLeft = -(this.pageTotal - 3) * this.pageWidth;
    }
    this.focusCircle(prevLeft);
    this.animate(this.scroll_wrap.offsetLeft, prevLeft);
}
ScrollBanner.prototype.next = function() {

    if (this.isRuningAnimate) return;

    var nextLeft = this.scroll_wrap.offsetLeft - this.pageWidth;
    if (nextLeft == -this.pageTotal * this.pageWidth) {
        this.scroll_wrap.style.left = -this.pageWidth + "px";
        nextLeft = -this.pageWidth * 2;
    }
    this.focusCircle(nextLeft);
    this.animate(this.scroll_wrap.offsetLeft, nextLeft);
}
ScrollBanner.prototype.animate = function(_from, _to) {
    clearInterval(this.animateTimer);
    this.isRuningAnimate = true;
    var self = this;
    var t = 0,
        d = this.config.steps;
    this.animateTimer = setInterval(function() {
        // console.log(timingFunction.solve(t/60).toFixed(6)*-1000);
        //var left=timingFunction.solve(t/60).toFixed(6)*-1000;
        var left = EaseFunDic[self.config.easeFun](t, _from, _to - _from, d);
        //console.log(left)
        self.scroll_wrap.style.left = left + 'px';
        t++;
        if (t > d) {
            clearInterval(self.animateTimer);
            self.isRuningAnimate = false;
            self.animateComplete();
            //self.runQueue();
        }
    }, 10);
}
ScrollBanner.prototype.stopPlay = function() {
    if (!this.isAutoPlay) return;
    clearInterval(this.autoPlayTimer);
}
ScrollBanner.prototype.autoPlay = function() {
    if (!this.isAutoPlay) return;
    var self = this;
    this.autoPlayTimer = setInterval(function() {
        //self.QueueOpt.push("next");
        //self.startQueue();
        self.next();
    }, this.interval);
}
module.exports = ScrollBanner;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// import {Util} from './lib/Util';
__webpack_require__(5);
var Util = __webpack_require__(0);
var Tab = __webpack_require__(1);
var BookTopTabPanel = __webpack_require__(6);
var TabWithBannerPanel = __webpack_require__(7);
var ScrollBanner = __webpack_require__(2);
var CountDown = __webpack_require__(8);
var MainBanner = __webpack_require__(9);

__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);


window.onload = function() {
    Util.$("top_menu_area").onmouseover = function() {
        Util.addClass(this, "area_active");
    };

    Util.$("top_menu_area").onmouseout = function() {
        Util.removeClass(this, "area_active");
    };

    ["top_menu_mydd", "top_menu_buy", "top_menu_service"].forEach(function(className) {
        Util.$(className).onmouseover = function() {
            Util.addClass(this, "active");
        }
        Util.$(className).onmouseout = function() {
            Util.removeClass(this, "active");
        }
    })

    MainBanner.init().autoPlay();
    new CountDown({ "id": "countDown",endTime: new Date().getTime() + 5 * 60 * 60 * 1000 }).start();

    new Tab({
        "con": "note_tabpanel",
        "contents": "content",
        "interval": 3500,
        "autoPlay": true
    });

    new Tab({
        "con": "buynow_tabpanel",
        "titles": "circle",
        "contents": "banner",
        "interval": 3000,
        "autoPlay": true
    });

    new BookTopTabPanel({
        "con": "book_panel_right_tab_panel",
        "head": "right_head",
        "contents": "right_booklist"
    });


    new ScrollBanner({
        "itemWidth": 202,
        "bannerID": "navScroolBanner",
        "wrapClassName": "banners_wrap",
        "itemClassName": "banner",
        "easeFun": "linear",
        "steps": 30,
        "autoPlay": true
    });


    new TabWithBannerPanel({
        "con": "book_panel_left_tab_panel",
        "head": "titles_con",
        "contents": "left_tab_content",
        "bannerConfig": {
            "className": "left_baner",
            "itemWidth": 335
        }
    });

    new TabWithBannerPanel({
        "con": "clothes_tab_panel",
        "head": "titles_con",
        "contents": "content",
        "bannerConfig": {
            "className": "center_banner",
            "itemWidth": 383
        }
    });


    new ScrollBanner({
        "itemWidth": 119,
        "pageNum": 10,
        "bannerID": "clothes_footer_banner",
        "wrapClassName": "links_wrap",
        "itemClassName": "link",
        "easeFun": "easeOutBack",
        "steps": 60,
        "interval": 2500,
        "autoPlay": true
    });

    new ScrollBanner({
        "itemWidth": 314,
        "bannerID": "baby_panel_banner",
        "wrapClassName": "banners_wrap",
        "itemClassName": "banner",
        "steps": 60,
        "interval": 2500,
        "autoPlay": true
    });





}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

   Function.prototype.bind = Function.prototype.bind || function(oThis) {
       if (typeof this !== 'function') {
           throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
       }
       var aArgs = Array.prototype.slice.call(arguments, 1),
           fToBind = this,
           fNOP = function() {},
           fBound = function() {
               return fToBind.apply(this instanceof fNOP ?
                   this :
                   oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
           };

       if (this.prototype) {
           // Function.prototype doesn't have a prototype property
           fNOP.prototype = this.prototype;
       }
       fBound.prototype = new fNOP();
       return fBound;
   };

   Array.prototype.forEach = Array.prototype.forEach || function(callback /*, thisArg*/ ) {
       var T, k;
       if (this == null) {
           throw new TypeError('this is null or not defined');
       }
       var O = Object(this);
       var len = O.length >>> 0;
       if (typeof callback !== 'function') {
           throw new TypeError(callback + ' is not a function');
       }
       if (arguments.length > 1) {
           T = arguments[1];
       }
       k = 0;
       while (k < len) {
           var kValue;
           if (k in O) {
               kValue = O[k];
               callback.call(T, kValue, k, O);
           }
           k++;
       }
   };

   Array.prototype.map = Array.prototype.map || function(callback /*, thisArg*/ ) {
       var T, A, k;
       if (this == null) {
           throw new TypeError('this is null or not defined');
       }
       var O = Object(this);
       var len = O.length >>> 0;
       if (typeof callback !== 'function') {
           throw new TypeError(callback + ' is not a function');
       }
       if (arguments.length > 1) {
           T = arguments[1];
       }
       A = new Array(len);
       k = 0;
       while (k < len) {
           var kValue, mappedValue;
           if (k in O) {
               kValue = O[k];
               mappedValue = callback.call(T, kValue, k, O);
               A[k] = mappedValue;
           }
           k++;
       }
       return A;
   };

   Array.prototype.reduce = Array.prototype.reduce || function(callback /*, initialValue*/ ) {
       if (this === null) {
           throw new TypeError('Array.prototype.reduce ' +
               'called on null or undefined');
       }
       if (typeof callback !== 'function') {
           throw new TypeError(callback +
               ' is not a function');
       }
       var o = Object(this);
       var len = o.length >>> 0;
       var k = 0;
       var value;
       if (arguments.length >= 2) {
           value = arguments[1];
       } else {
           while (k < len && !(k in o)) {
               k++;
           }
           if (k >= len) {
               throw new TypeError('Reduce of empty array ' +
                   'with no initial value');
           }
           value = o[k++];
       }
       while (k < len) {
           value = callback(value, o[k], k, o);
           k++;
       }
       return value;
   };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

 var Tab = __webpack_require__(1);
 var Util = __webpack_require__(0);

 function BookTopTabPanel(config) {
     Tab.call(this, config);
     this.books = null;
 }
 Util.inherit(BookTopTabPanel, Tab);
 BookTopTabPanel.prototype.initComplete = function() {
     this.books = Util.$("right_book", this.con);
 }
 BookTopTabPanel.prototype.initEventComplete = function() {
     var self = this;
     var books = this.books;
     for (var i = 0; i < books.length; i++) {
         books[i].index = i;
         books[i].onmouseover = function() {
             var active = Util.$("active", self.getCurrentContent());
             if (active) Util.removeClass(active, "active");
             Util.addClass(books[this.index], "active");
         }
     }
 }
 module.exports = BookTopTabPanel;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

 var Tab = __webpack_require__(1);
 var Util = __webpack_require__(0);
 var ScrollBanner = __webpack_require__(2);

 function TabWithBannerPanel(config) {
     this.bannerWidth = config.bannerConfig.itemWidth;
     this.bannerClassName = config.bannerConfig.className;
     Tab.call(this, config);

 }
 Util.inherit(TabWithBannerPanel, Tab);
 TabWithBannerPanel.prototype.initComplete = function() {
     var self=this;
     this.scrollBanners = [];
     var tabId = this.config.con;
     var contents = this.contents;
     for (var i = 0; i < contents.length; i++) {
         var baner = Util.$(this.bannerClassName, contents[i]);
         baner.id = tabId + i;
         this.scrollBanners.push(new ScrollBanner({
             "itemWidth": this.bannerWidth,
             "bannerID": baner.id,
             "wrapClassName": "banners_wrap",
             "itemClassName": "banner",
             "easeFun": "easeOutCubic",
             "step":50,
             "autoPlay": true
         }));
     }
 }
 module.exports = TabWithBannerPanel;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
function CountDown(config) {
    if (!(this instanceof CountDown)) return new CountDown(config);
    this.endTime = null; //Util.ie6?new Date(Date.parse("2017-09-30 00:00:00".replace(/-/g,"/"))).getTime():Date.parse("2017-09-30 00:00:00");
    this.timer = null;
    this.el = null;
    this.nums = null;
    this.init(config);
    this.updateUI();
    this.start();
}
CountDown.prototype.leftPad = function(num) {
    var str = num.toString();
    return str.length < 2 ? "0" + str : str;
};
CountDown.prototype.init = function(config) {
    var el = this.el = Util.$$(config.id || "countDown");
    this.nums = Util.$("num", el);
    this.endTime = config.endTime;
}
CountDown.prototype.updateUI = function() {
    var now, seconds, day, hour, minute, second;
    //now = Date.now();
    now = new Date().getTime();

    seconds = parseInt((this.endTime - now) / 1000);
    if (seconds < 0) {
        clearInterval(this.timer);
        return;
    };
    day = Math.floor(seconds / (60 * 60 * 24));
    hour = Math.floor((seconds - day * 24 * 60 * 60) / 3600);
    minute = Math.floor((seconds - day * 24 * 60 * 60 - hour * 3600) / 60);
    second = Math.floor(seconds - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
    this.nums[0].innerHTML = this.leftPad(hour);
    this.nums[1].innerHTML = this.leftPad(minute);
    this.nums[2].innerHTML = this.leftPad(second);
}
CountDown.prototype.start = function() {
    var self = this;
    this.timer = setInterval(function() {
        self.updateUI();
    }, 1000);
}
module.exports = CountDown;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

  var OpacityBanner = __webpack_require__(10);
  var Util = __webpack_require__(0);
  var MainBanner = {
      "autoPlayTimer": null,
      "mainBanner": null,
      "subBanner": null,
      "interval": 2000,
      "init": function() {
          var self = this;
          this.mainBanner = new OpacityBanner({
              "id": "mainBanner",
              "itemClass": "banner",
              "autoPlay": false
          }).on("focusChange", function(event) {
              if (event.msg == "prev") {
                  this.subBanner.prev();
                  return;
              }
              this.subBanner.next();

          }.bind(this));

          this.subBanner = new OpacityBanner({
              "id": "mainSubBanner",
              "itemClass": "banner",
              "autoPlay": false
          }).on("focusChange", function(event) {
              if (event.msg == "prev") {
                  this.mainBanner.prev();
                  return;
              }
              this.mainBanner.next();
          }.bind(this));
          this.initEvent();
          return this;
      },
      "next": function() {
          this.mainBanner.next();
          this.subBanner.next();
      },
      "initEvent": function() {
          var self = this;
          Util.$("nav_center").onmouseover = function() {
              self.stopPlay();
          }
          Util.$("nav_center").onmouseout = function() {
              self.autoPlay();
          }
          return this;
      },
      "stopPlay": function() {
          clearInterval(this.autoPlayTimer);
          return this;
      },
      "autoPlay": function() {
          var self = this;
          this.autoPlayTimer = setInterval(function() {
              self.next();
          }, self.interval);
          return this;
      }
  }
  module.exports = MainBanner;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);
var EventEmitter = __webpack_require__(11);
//var inherits = require('./Inherits.js');
var DefaultConfig = {
    steps: 20,
    interval: 2000,
    autoPlay: false
};

function OpacityBanner(config) {
    this.config = Util.deepCopy(config, Util.deepCopy(DefaultConfig));
    if (!(this instanceof OpacityBanner)) return new OpacityBanner(config);
    this.cur_index = 4;
    this.banner_con = null;
    this.banners = null;
    this.circles = null;
    this.prev_button = null;
    this.next_button = null;
    this.animateTimer = null;
    this.autoPlayTimer = null;
    this.isAutoPlay = this.config.autoPlay;
    this.step = 0;
    this.total = this.config.steps;
    this.interval = this.config.interval;
    this.isHaveButtons = true;
    this.ie6 = !-[1, ] && !window.XMLHttpRequest;
    this.isHaveCircles = false;
    this.init(config);
    EventEmitter.call(this);
}
Util.inherit(OpacityBanner, EventEmitter);

OpacityBanner.prototype.init = function(config) {
    var banner_con = this.banner_con = Util.$$(config.id || "main_banner");
    this.cur_index = config.index || 0;
    this.banners = Util.$(config.itemClass || "item", banner_con);
    this.circles = Util.$("circle_con", banner_con);
    if (this.circles.childNodes) {
        this.circles = this.circles.getElementsByTagName("li");
        this.isHaveCircles = true;
    }

    this.prev_button = Util.$("prev", banner_con);
    this.next_button = Util.$("next", banner_con);
    this.isHaveButtons = !!this.prev_button;
    this.initUI();
    this.initEvent();
}
OpacityBanner.prototype.initUI = function() {
    var banners = this.banners;
    //ie下切换去除动画
    if (this.ie6) {
        for (var i = 0; i < banners.length; i++) {
            Util.addClass(banners[i], "hide");
        }
        Util.removeClass(banners[this.cur_index], "hide");

    } else {
        for (var i = 0; i < banners.length; i++) {
            Util.removeClass(banners[i], "hide");
            banners[i].style.opacity = 0;
            banners[i].style.filter = "alpha(opacity=0)";
        }
        banners[this.cur_index].style.opacity = 1;
        banners[this.cur_index].style.filter = "alpha(opacity=100)";
    }

    if (this.isHaveCircles) {
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].index = i;
            Util.removeClass(this.circles[i], "active");
        }
        Util.addClass(this.circles[this.cur_index], "active");
    }

    this.initButtons(false);
}
OpacityBanner.prototype.initButtons = function(show) {
    if (!this.isHaveButtons) return;
    if (show) {
        this.prev_button.style.display = "block";
        this.next_button.style.display = "block";
        return;
    }
    this.prev_button.style.display = "none";
    this.next_button.style.display = "none";
}
OpacityBanner.prototype.initEvent = function() {
    var self = this;
    this.banner_con.onmouseover = function() {
        self.stopPlay();
        self.initButtons(true);
    }
    this.banner_con.onmouseout = function() {
        self.autoPlay();
        self.initButtons(false);
    }
    if (this.isHaveButtons) {
        this.prev_button.onclick = function() {
            self.prev();
            self.emit("focusChange", { "msg": "prev" });
        }
        this.next_button.onclick = function() {
            self.next();
            self.emit("focusChange", { "msg": "next" });
        }
    }

    for (var i = 0; i < this.circles.length; i++) {
        this.circles[i].onclick = function() {
            self.focus(this.index);
            self.emit("focusChange", { "msg": "focus" });
        };
    }
    this.autoPlay();
}
OpacityBanner.prototype.focusCircle = function(index) {
    Util.removeClass(this.circles[this.cur_index], "active");
    Util.addClass(this.circles[index], "active");
}
OpacityBanner.prototype.focus = function(index) {
    var self = this;
    var banners = this.banners;

    //ie下切换去除动画
    if (this.ie6) {
        self.focusCircle(index);
        Util.removeClass(banners[index], "hide");
        Util.addClass(banners[this.cur_index], "hide");
        self.cur_index = index;
        return;
    }

    banners[this.cur_index].style.zIndex = 2;
    banners[index].style.zIndex = 1;
    banners[index].style.opacity = 0;
    banners[index].style.filter = "alpha(opacity=100)";

    if (this.isHaveCircles) self.focusCircle(index);


    clearInterval(this.animateTimer);

    this.animateTimer = setInterval(function() {
        self.step++;
        banners[self.cur_index].style.opacity = 1 - self.step / self.total;
        banners[self.cur_index].style.filter = "alpha(opacity=" + parseInt(100 - 100 * self.step / self.total) + ")";
        banners[index].style.opacity = self.step / self.total;
        banners[index].style.filter = "alpha(opacity=" + parseInt(100 * self.step / self.total) + ")";
        if (self.step == self.total) {
            banners[self.cur_index].style.zIndex = 0;
            banners[index].style.zIndex = 0;
            clearInterval(self.animateTimer);
            self.step = 0;
            self.cur_index = index;
        }
    }, 17);
}
OpacityBanner.prototype.next = function() {
    var next = this.cur_index + 1;
    if (next > this.banners.length - 1) {
        next = 0;
    }
    this.focus(next);

}
OpacityBanner.prototype.prev = function() {
    var prev = this.cur_index - 1;
    if (prev < 0) {
        prev = this.banners.length - 1;
    }
    this.focus(prev);
}
OpacityBanner.prototype.stopPlay = function() {
    if (!this.isAutoPlay) return;
    clearInterval(this.autoPlayTimer);
}
OpacityBanner.prototype.autoPlay = function() {
    if (!this.isAutoPlay) return;
    var self = this;
    this.autoPlayTimer = setInterval(function() {
        self.next();
    }, this.interval);
}
module.exports = OpacityBanner;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);