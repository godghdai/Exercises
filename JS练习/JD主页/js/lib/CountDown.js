 define(["Util"], function(Util) {
     function CountDown(config) {
         if (!(this instanceof CountDown)) return new CountDown(config);
         this.endTime = Date.parse("2017-09-30 00:00:00");
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
         this.endTime = config.endTime||Date.parse("2017-09-29 00:00:00");
     }
     CountDown.prototype.updateUI = function() {
         var now, seconds, day, hour, minute, second;
         now = Date.now();
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
     return CountDown;

 })