(function(factory) {
    window.onload = function() {
        factory && factory();
    }
})(function() {

    function getElementsByClassName(searchClass, node, tag) {
        if (document.getElementsByClassName) {
            return (node || document).getElementsByClassName(searchClass)
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

    function getCSS(obj, attr) {
        return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
    }

    function getOffset(el) {
        var result = {
            "top": el.offsetTop,
            "left": el.offsetLeft
        };
        var parent = el.offsetParent;
        while (parent != null) {
            //ie8 border-left-width 取到的值不是数字
            result["left"] += parent.offsetLeft + (parseFloat(getCSS(parent, 'border-left-width')) || 0);
            result["top"] += parent.offsetTop + (parseFloat(getCSS(parent, 'border-top-width')) || 0);
            parent = parent.offsetParent;
        }
        return result;
    }

    function arrayToStr(array, iterator) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            result.push(iterator(array[i]));
        }
        return result.join("");
    }

    function Preview(id, data) {
        this.preview = document.getElementById(id);
        this.middleWidth = 400;
        this.dragWidth = 200;
        this.smallWidth = 54;
        this.marginRight = 20;
        this.colNum = 5;
        this.itemWidth = this.smallWidth + this.marginRight;
        this.timer = null;
        this.data = data || [];
        this.middle = null;
        this.drag = null;
        this.big = null;
        this.zoom = null;
        this.small_con = null;
        this.init();
    }
    Preview.prototype.init = function() {
        var preview = this.preview;
        this.middle = getElementsByClassName("middle", preview)[0];
        this.drag = getElementsByClassName("drag", preview)[0];
        this.big = getElementsByClassName("big", preview)[0];
        this.zoom = getElementsByClassName("zoom", preview)[0];
        this.small_con = getElementsByClassName("small_con", preview)[0];
        this.renderUI();
        this.initEvent();
    }
    Preview.prototype.renderUI = function() {
        var colNum = this.colNum,
            data = this.data,
            lastPage = null;
        if (data.length > colNum) {
            if (data.length % colNum == 0) {
                lastPage = data.slice(-colNum);
            } else {
                lastPage = data.slice(-data.length % colNum);
                var padCount = colNum - data.length % colNum;
                while (padCount) {
                    data.push(null);
                    lastPage.push(null);
                    padCount--;
                }
            }
            //复制最后一页的数据到开头 复制第一页的数据到结尾
            var circleArray = lastPage.concat(data).concat(data.slice(0, colNum));
            this.small_con.innerHTML = arrayToStr(circleArray, function(item) {
                if (item != null)
                    return '<li class="item"><a href="javascript:;"><img src="./imgs/' + item.name + '_small.jpg" alt=""></a></li>';
                return '<li class="item"></li>';
            });
            this.small_con.style.width = circleArray.length * this.itemWidth + "px";
        }
    };
    Preview.prototype.initEvent = function() {
        var drag = this.drag,
            big = this.big,
            zoom = this.zoom,
            self = this;
        var middleOffset = getOffset(this.middle);
        var max = this.middleWidth - this.dragWidth;
        this.middle.onmouseover = function() {
            drag.style.display = 'block';
            zoom.style.display = 'block';
        }
        this.middle.onmousemove = function(ev) {
            ev = ev || window.event;
            //兼容ie8以下浏览器
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x =  (ev.pageX || ev.clientX + scrollX) - middleOffset["left"] - self.dragWidth / 2;
            var y =  (ev.pageY || ev.clientY + scrollY) - middleOffset["top"] - self.dragWidth / 2;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > max) x = max;
            if (y > max) y = max;

            drag.style.left = x + "px";
            drag.style.top = y + "px";
            big.style.left = -self.middleWidth * x / max + "px";
            big.style.top = -self.middleWidth * y / max + "px";
        }
        this.middle.onmouseout = function() {
            drag.style.display = 'none';
            zoom.style.display = 'none';
        }

        var items = getElementsByClassName("item", preview);
        var middle_img = this.middle.getElementsByTagName("img")[0];
        var zoom_img = big.getElementsByTagName("img")[0];
        for (var i = 0; i < items.length; i++) {
            items[i].onmouseover = function() {
                if (this.getElementsByTagName("img")[0] != null) {
                    var src = this.getElementsByTagName("img")[0].getAttribute("src");
                    /(\d+)/.test(src);
                    middle_img.src = "./imgs/" + RegExp.$1 + "_middle.jpg";
                    zoom_img.src = "./imgs/" + RegExp.$1 + "_big.jpg";
                }

            }
        }
        this.itemCount = items.length / this.colNum;
        this.small_con.style.left = -this.itemWidth * this.colNum + this.marginRight + "px";

        getElementsByClassName("button_left", preview)[0].onclick = function() {
            self.move(self.small_con, -1)
        }
        getElementsByClassName("button_right", preview)[0].onclick = function() {
            self.move(self.small_con, 1)
        }

    }
    Preview.prototype.move = function(el, to) {
        var self = this;
        var itemWidth = this.itemWidth * this.colNum;
        var itemCount = this.itemCount;

        var from_left = el.offsetLeft;
        var to_left = from_left + to * itemWidth;
        if (to_left > this.marginRight) {
            el.style.left = -(itemCount - 2) * itemWidth + "px";
            from_left = -(itemCount - 2) * itemWidth;
            to_left = -(itemCount - 3) * itemWidth + this.marginRight;
        }
        if (to_left < -(itemCount - 1) * itemWidth) {
            this.small_con.style.left = -itemWidth + "px";
            from_left = -itemWidth;
            to_left = -2 * itemWidth + this.marginRight;
        }

        var step = 0;
        this.timer = setInterval(function() {
            if (step > 15) {
                clearInterval(self.timer);
                return;
            }
            self.small_con.style.left = from_left + (to_left - from_left) * step / 15 + "px";
            step++;
        }, 16)
    }
    new Preview("preview", [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }]);
});