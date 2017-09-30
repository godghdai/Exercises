 define(["Util"], function(Util) {
     var DefaultConfig = { isAnimateSwitch: true };

     function TabModule(config) {
         config = Util.deepCopy(config, Util.deepCopy(DefaultConfig));
         this.cur_index = 0;
         this.module = null;
         this.titles = null;
         this.banners = null;
         this.animateTimer = null;
         this.step = config.step || 8;
         this.isAnimateSwitch = config.isAnimateSwitch;
         this.width = 190;
         this.init(config);
     }
     TabModule.prototype.init = function(config) {
         var module = this.module = Util.$(config.className)[0];
         this.titles = Util.$("tab_title", module)[0].getElementsByTagName("a");
         this.content_wrap = Util.$("tab_content", module)[0].getElementsByTagName("div")[0];
         this.initUI();
         this.initEvent();
     }
     TabModule.prototype.initUI = function() {
         for (var i = 0; i < this.titles.length; i++) {
             Util.removeClass(this.titles[i], "active");
         }
         Util.addClass(this.titles[this.cur_index], "active");
         //this.content_wrap.parentNode.style.overflow = 'hidden';
     }
     TabModule.prototype.initEvent = function() {
         var self = this;
         var titles = this.titles;
         for (var i = 0; i < titles.length; i++) {
             titles[i].index = i;
             titles[i].onmouseover = function() {
                 self.changeTitle(this.index);
                 if (self.isAnimateSwitch) {
                     self.animate(this.index);
                     return;
                 }
                 self.content_wrap.style.left = -this.index * self.width + "px";

             }
         }
     }
     TabModule.prototype.changeTitle = function(newIndex) {
         if (newIndex == this.cur_index) return;
         Util.addClass(this.titles[newIndex], "active");
         Util.removeClass(this.titles[this.cur_index], "active");
         this.cur_index = newIndex;
     }
     TabModule.prototype.animate = function(newIndex) {
         var _to = -newIndex * this.width;
         clearInterval(this.animateTimer);
         var self = this,
             wrap = this.content_wrap;
         this.animateTimer = setInterval(function() {
             var speed = (_to - wrap.offsetLeft) / self.step;
             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
             if (wrap.offsetLeft == _to) {
                 clearInterval(self.animateTimer);
                 return;
             }
             wrap.style.left = wrap.offsetLeft + speed + 'px';
         }, 10);
     }
     TabModule.initModules = function() {
         var modules = ["module_plane_ticket", "module_hotel", "module_game"];
         for (var i = 0; i < modules.length; i++) {
             new TabModule({ "className": modules[i] });
         }
         new TabModule({ "className": "module_telephone_fare","isAnimateSwitch": false });
     }
     return TabModule;

 })