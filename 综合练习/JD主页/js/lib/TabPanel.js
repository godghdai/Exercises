 define(["Util"], function(Util) {
     function TabPanel(config) {
         this.cur_index = 0;
         this.con = null;
         this.titles = null;
         this.banners = null;
         this.line = null;
         this.animateTimer = null;
         this.offsetIndexDic = {};
         this.leftOffset = config.leftOffset;
         this.step=config.step||16;
         this.init(config);
     }
     TabPanel.prototype.init = function(config) {
         var con = this.con = Util.$(config.className)[0];
         this.line = Util.$("line", con)[0];
         this.titles = Util.$("title", Util.$("head", con)[0]);
         this.banners = Util.$("baner", con);
         this.initUI();
         this.initEvent();
     }
     TabPanel.prototype.changeBanner = function(to) {
         var newIndex = this.offsetIndexDic[to];
         if (newIndex == this.cur_index) return;
         Util.removeClass(this.banners[newIndex], "hide");
         Util.addClass(this.banners[this.cur_index], "hide");
         this.cur_index = newIndex;
         
     }
     TabPanel.prototype.initUI = function() {
         for (var i = 0; i < this.banners.length; i++) {
             if (i == this.cur_index) continue;
             Util.addClass(this.banners[i], "hide");
         }
         Util.removeClass(this.banners[this.cur_index], "hide");
         this.line.style.left = this.titles[this.cur_index].offsetLeft + this.leftOffset + 'px';
     }
     TabPanel.prototype.initEvent = function() {
         var self = this;
         var titles = this.titles;
         for (var i = 0; i < titles.length; i++) {
             this.offsetIndexDic[titles[i].offsetLeft + this.leftOffset] = i;
             titles[i].onmouseover = function() {
                 self.animate(this.offsetLeft + self.leftOffset);
             }
         }
     }
     TabPanel.prototype.animate = function(_to) {
         this.changeBanner(_to);
         clearInterval(this.animateTimer);
         var self = this;
         this.animateTimer = setInterval(function() {
             var line = self.line;
             var speed = (_to - line.offsetLeft) / self.step;
             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
             if (line.offsetLeft == _to) {
                 clearInterval(self.animateTimer);
                 return;
             }
             line.style.left = line.offsetLeft + speed + 'px';
         }, 10);
     }
     return TabPanel;

 })