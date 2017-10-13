var Util = require('./Util');
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