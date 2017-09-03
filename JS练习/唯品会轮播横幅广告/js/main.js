(function(factory, document, window) {
    var Tools = {
        "Tween": {
            linear: function(t, b, c, d) { //匀速
                return c * t / d + b;
            },
            easeIn: function(t, b, c, d) { //加速曲线
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) { //减速曲线
                return -c * (t /= d) * (t - 2) + b;
            },
            easeBoth: function(t, b, c, d) { //加速减速曲线
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInStrong: function(t, b, c, d) { //加加速曲线
                return c * (t /= d) * t * t * t + b;
            }
        },
        getStyle: function(obj, attr) {
            var value = obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
            //if (attr == "opacity") return Math.ceil(value) * 100;
            return parseInt(value);
        },
        setStyle: function(obj, attrJson) {
            if (typeof attrJson != "object") {
                var params = Array.prototype.slice.call(arguments, 1);
                if (params.length % 2 != 0) return;
                attrJson = {};
                for (var i = 0; i < params.length - 1; i += 2) {
                    attrJson[params[i]] = params[i + 1];
                }
            }
            for (attr in attrJson) {
                switch (attr) {
                    case "opacity":
                        obj.style.opacity = attrJson[attr];
                        obj.style.filter = 'alpha(opacity=' + attrJson[attr] * 100 + ')';
                        break;
                    default:
                        obj.style[attr] = attrJson[attr] + 'px';
                        break;
                }
            }
        },
        animate: function(obj, attrJson, times, fx) {
            clearInterval(obj.timer);
            var self = this,
                startTime = new Date().getTime(),
                curValues = {};
            for (var attr in attrJson) { curValues[attr] = self.getStyle(obj, attr); }

            obj.timer = setInterval(function() {
                var nowTime = new Date().getTime(),
                    dur = Math.min(nowTime - startTime, times); //,
                // offset, step;
                for (var attr in attrJson) {
                    curValues[attr] = self.Tween[fx](dur, curValues[attr], attrJson[attr] - curValues[attr], times);
                    //offset = attrJson[attr] - curValues[attr];
                    //step = dur / times * Math.abs(offset);
                    // curValues[attr] += offset < 0 ? -step : step;
                }
                self.setStyle(obj, curValues);

                if (dur == times) {
                    clearInterval(obj.timer);
                    return;
                }
            }, 16);
        }

    };
    window.onload = function() {
        (typeof factory == "function") && factory.call(null, document, Tools);
    }
})(function(document, _) {



    var cur_index = 0;
    var items = document.getElementsByClassName("item-base");
    var footerItems = document.getElementsByClassName("footer-item");
    var footerLine = document.getElementsByClassName("footer-line")[0];

    document.getElementsByClassName("button-left")[0].onclick = function(event) {
        var prev = cur_index - 1;
        if (prev < 0) prev = items.length - 1;
        focusBanner(prev);
    }
    document.getElementsByClassName("button-right")[0].onclick =next;

	function next() {
        var next = cur_index + 1;
        if (next > items.length - 1) next = 0;
        focusBanner(next);
    }


    function focusBanner(index) {
        var new_index = Math.min(Math.max(0, index), items.length - 1);
        if (cur_index == new_index) return;
        items[cur_index].style.zIndex = 2;
        items[new_index].style.zIndex = 1;
        items[new_index].style.opacity = 1;
        items[new_index].style.filter = "alpha(opacity=100)";

        _.animate(footerLine, { "left": footerItems[new_index].offsetLeft }, 100, "easeIn");
        _.animate(items[cur_index], { "opacity": 0 }, 800, "easeIn");
        _.animate(items[new_index], { "opacity": 1 }, 800, "easeIn");
        cur_index = new_index;
    }


    for (var i = 0; i < footerItems.length; i++) {
        footerItems[i].index = i;
        footerItems[i].onmouseover = function() {
            var self = this;
            focusBanner(self.index);

        }
    }


}, document, window);