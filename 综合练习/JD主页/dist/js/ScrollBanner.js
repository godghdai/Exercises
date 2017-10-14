 define(["Util", "CubicBezier"], function(Util, CubicBezier) {
     //var timingFunction = new CubicBezier(0, 1.35, .83, .98);

     var EaseFunDic = {
         easeOutBack: function(t, b, c, d, s) {
             var s = 1.35;
             // if (s == undefined) s = 1.70158;
             return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
         },
         easeOutCubic: function(t, b, c, d) {
             return c * ((t = t / d - 1) * t * t + 1) + b;
         },
         linear: function(t,b,c,d){ return c*t/d + b; }
     }
     var DefaultConfig = {
         "easeFun": "easeOutCubic",
         "pageNum": 5,
         "itemWidth": 200,
         "bannerID": "buy_now_scroll_banner",
         "wrapID": "buy_now_scroll_banner_wrap",
         "itemClassName": "product",
         "steps": 60
     }

     function ScrollBanner(config) {
         this.config = Util.deepCopy(config, Util.deepCopy(DefaultConfig));
         this.animateTimer = null;
         this.pageNum = this.config.pageNum;
         this.itemWidth = this.config.itemWidth;
         this.pageWidth = this.config.pageNum * this.config.itemWidth;
         this.pageTotal = 0;
         this.QueueOpt = [];
         this.QueueStatus = "stop";
         this.items = null;
         this.scroll_banner = null;
         this.scroll_wrap = null;
         this.prev_button = null;
         this.next_button = null;
         this.init();
     }
     ScrollBanner.prototype.init = function() {
         var scroll_banner = this.scroll_banner = Util.$$(this.config.bannerID);
         this.scroll_wrap = Util.$$(this.config.wrapID);
         this.prev_button = Util.$("prev", scroll_banner)[0];
         this.next_button = Util.$("next", scroll_banner)[0];
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
         this.scroll_wrap.style.left = -this.pageWidth + "px";
         this.scroll_wrap.style.width = this.pageNum * this.pageWidth + "px";
         this.pageTotal = items.length / this.pageNum + 2;
         this.prev_button.style.display = 'none';
         this.next_button.style.display = 'none';
         this.items = Util.$(this.config.itemClassName, this.scroll_wrap);
         this.changeLineStatus("hide");
     }
     ScrollBanner.prototype.initEvent = function() {
         var self = this;
         this.scroll_banner.onmouseover = function() {
             self.prev_button.style.display = 'block';
             self.next_button.style.display = 'block';
         }
         this.scroll_banner.onmouseout = function() {
             self.prev_button.style.display = 'none';
             self.next_button.style.display = 'none';
         }

         this.prev_button.onclick = function() {
             self.QueueOpt.push("prev");
             self.startQueue();
         }
         this.next_button.onclick = function() {
             self.QueueOpt.push("next");
             self.startQueue();
         }
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
     ScrollBanner.prototype.prev = function() {
         var prevLeft = this.scroll_wrap.offsetLeft + this.pageWidth;
         if (prevLeft == this.pageWidth) {
             this.scroll_wrap.style.left = -(this.pageTotal - 2) * this.pageWidth + "px";
             prevLeft = -(this.pageTotal - 3) * this.pageWidth;
         }
         this.animate(this.scroll_wrap.offsetLeft, prevLeft);
     }
     ScrollBanner.prototype.next = function() {
         var nextLeft = this.scroll_wrap.offsetLeft - this.pageWidth;
         if (nextLeft == -this.pageTotal * this.pageWidth) {
             this.scroll_wrap.style.left = -this.pageWidth + "px";
             nextLeft = -this.pageWidth * 2;
         }
         this.animate(this.scroll_wrap.offsetLeft, nextLeft);
     }
     ScrollBanner.prototype.changeLineStatus = function(status) {
         var lastIndex = Math.abs(this.scroll_wrap.offsetLeft) / this.pageWidth * this.pageNum + this.pageNum - 1;
         var line = Util.$("line", this.items[lastIndex])[0];
         line&&(line.style.display = status=="show"?'block':'none');

     }
     ScrollBanner.prototype.animate = function(_from, _to) {
         clearInterval(this.animateTimer);
         var self = this;
         var t = 0,
             d = this.config.steps;
         this.changeLineStatus("show");
         this.animateTimer = setInterval(function() {
             // console.log(timingFunction.solve(t/60).toFixed(6)*-1000);
             //var left=timingFunction.solve(t/60).toFixed(6)*-1000;
             var left = EaseFunDic[self.config.easeFun](t, _from, _to - _from, d);
             //console.log(left)
             self.scroll_wrap.style.left = left + 'px';
             t++;
             if (t > d) {
                 clearInterval(self.animateTimer);
                 self.changeLineStatus("hide");
                 self.runQueue();
             }
         }, 10);
     }
     ScrollBanner.initScrollBaner = function() {
         new ScrollBanner({"easeFun": "linear","steps": 40});
         var logoWraps = Util.$("core_footer_panel");
         for (var i = 0; i < logoWraps.length; i++) {
             logoWraps[i].id = "scroll_logos_banner" + i;
             var logos_con = Util.$("logos_con", logoWraps[i])[0];
             logos_con.style.position = 'absolute';
             logos_con.id = "scroll_logos_banner_wrap" + i;
             var logoLength = Util.$("logo", logos_con).length;

             new ScrollBanner({
                 "easeFun": "easeOutBack",
                 "pageNum": logoLength == 24 ? 12 : 6,
                 "itemWidth": 95,
                 "bannerID": "scroll_logos_banner" + i,
                 "wrapID": "scroll_logos_banner_wrap" + i,
                 "itemClassName": "logo",
                 "steps": 60
             });
         }

     }
     return ScrollBanner;
 });