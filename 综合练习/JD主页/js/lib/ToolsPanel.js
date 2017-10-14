 define(["Util"], function(Util) {
     function easeInOutQuart(t, b, c, d) {
         if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
         return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
     }

     function easeInOutExpo(t, b, c, d) {
         if (t == 0) return b;
         if (t == d) return b + c;
         if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
         return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
     }

     function easeInCubic(t, b, c, d) {
         return c * (t /= d) * t * t + b;
     }

     function ToolsPanel(config) {
         this.pop_wrap = null;
         this.pop_win = null;
         // 防止动画过程中事件onmouseover穿透
         this.pop_win_mask = null;
         this.animateTimer = null;
         this.step = 8;
         this.status = "close";
         this.animateStatus = "stop";
         this.init();
         this.initUI();
         this.initEvent();
     }

     ToolsPanel.prototype.init = function(config) {
         var toolsPanel = Util.$$("toolsPanel");
         var toolsPanelCon = this.toolsPanelCon = Util.$$("toolsPanelCon");
         this.items = Util.$("tools_item", toolsPanelCon);
         this.pop_wrap = Util.$("pop_wrap", toolsPanel)[0];
         this.pop_win = Util.$("pop_win", toolsPanel)[0];
         this.pop_win_mask = Util.$("pop_win_mask", toolsPanel)[0];

         this.transitionSupport = Util.transitionCheck();
     }
     ToolsPanel.prototype.initUI = function() {
         var self = this;
         var items = this.items,
             atag;
         // if (!this.transitionSupport) {
         for (var i = 0, length = items.length; i < 4; i++) {
             items[i].style.position = "relative";
             atag = items[i].getElementsByTagName("a")[0];
             atag.style.position = "absolute";
             atag.style.left = 0;
             atag.style.top = 0;
             items[i].atag = atag;
         }
         // }

     }
     ToolsPanel.prototype.initEvent = function() {

         var self = this,
             items = this.items;
         for (var i = 0, length = items.length; i < 4; i++) {
             items[i]._minus = Util.$("ico_minus", items[i])[0];
             items[i].index = i;
             items[i].onmouseover = function() {
                 self.changeStyle(this);
                 if (self.status == "close" && self.animateStatus == "stop") {
                     self.open();
                 }

             }
         }

         var closeButtons = Util.$("close", this.pop_wrap);
         for (var i = 0; i < closeButtons.length; i++) {
             closeButtons[i].onclick = function() {
                 self.close();
             }
         }
     }
     ToolsPanel.prototype.changeStyle = function(item) {
         var active_title = Util.$("active_title", toolsPanelCon);
         if (active_title.length != 0)
             Util.removeClass(active_title[0], "active_title");

         var span = Util.$("title", item)[0];
         Util.addClass(span, "active_title");
         this.pop_wrap.style.top = -item.index * 185 + "px"

     }
     ToolsPanel.prototype.open = function() {
         this.pop_win_mask.style.display = 'block';
         this.animateStatus = "runing";
         this.animate("open");
     }
     ToolsPanel.prototype.close = function() {
         this.pop_win_mask.style.display = 'block';
         var active_title = Util.$("active_title", toolsPanelCon);
         if (active_title.length != 0)
             Util.removeClass(active_title[0], "active_title");
         this.animate("close");
     }
     ToolsPanel.prototype.animate = function(status) {
         clearInterval(this.animateTimer);
         var self = this;
         var items = this.items;
         var t = 0,
             d = 20;
         this.animateTimer = setInterval(function() {
             var top, minus_top, minus_width, minus_height, minus_right, pop_bottom;
             if (status == "open") {
                 top = easeInCubic(t, 0, -38, d);
                 pop_bottom = easeInOutQuart(t, -185, 185, d);
             } else {
                 top = easeInCubic(t, -38, 38, d);
                 pop_bottom = easeInOutQuart(t, 0, -185, d);
             }
             for (var i = 0, length = items.length; i < 4; i++) {
                 if (items[i]._minus) {

                     if (status == "open") {
                         minus_top = easeInOutExpo(t, 0, 42, d);
                         minus_width = easeInOutExpo(t, 13, 4 - 13, d);
                         minus_height = easeInOutExpo(t, 16, 4 - 16, d);
                         minus_right = easeInOutExpo(t, 0, 2, d);
                         items[i]._minus.childNodes[0].style.display = 'none';
                         items[i]._minus.childNodes[1].style.display = 'none';
                     } else {
                         minus_top = easeInCubic(t, 42, 0 - 42, d);
                         minus_width = easeInCubic(t, 4, 13 - 4, d);
                         minus_height = easeInCubic(t, 4, 16 - 4, d);
                         minus_right = easeInCubic(t, 2, 0 - 2, d);
                         items[i]._minus.childNodes[0].style.display = 'block';
                         items[i]._minus.childNodes[1].style.display = 'block';
                         // console.log(minus_top);

                     }
                     items[i]._minus.style.top = minus_top + 'px';
                     items[i]._minus.style.right = minus_right + 'px';
                     items[i]._minus.style.width = minus_width + 'px';
                     items[i]._minus.style.height = minus_height + 'px';
                 }
                 items[i].atag.style.top = top + 'px';
                 self.pop_win.style.bottom = pop_bottom + 'px';
             }
             t++;
             if (t > d) {
                 clearInterval(self.animateTimer);
                 self.pop_win_mask.style.display = 'none';
                 self.status = status;
                 self.animateStatus = "stop";
             }
         }, 10);
     }
     return ToolsPanel;

 })