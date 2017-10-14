   var Util = require('./Util');
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