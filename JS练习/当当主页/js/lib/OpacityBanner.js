var Util = require('./Util');
var EventEmitter = require('./EventEmitter');
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