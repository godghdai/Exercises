function Clock(id, opition) {
    if (!(this instanceof Clock)) return new Clock(id, opition)
    this.wrap = document.getElementById(id);
    this.img_cons = [];
    this.step_tick = 0;
    this.step_run = 0;
    this._width = (opition || {}).width || 122;
    this._height = (opition || {}).height || 172;
    this.init();
}
Clock.prototype.init = function() {
    this.createWrap();
    this.createCSS();
    this.createUI();
}
Clock.isInitCss = false;
Clock.getElementsByClassName = function(searchClass, node, tag) {
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
Clock.prototype.createCSS = function() {
    if (!Clock.isInitCss) {
        var css = [];
        var style = document.createElement("style");
        css.push(".god_clock{} .god_clock ul{list-style:none;padding:0; margin:0;overflow:hidden}");
        css.push(".god_clock .column{float:left;width:" + this._width + "px;height:" + this._height + "px;overflow:hidden;position:relative;}");
        css.push(".god_clock .img_con{position:absolute;top:0;left:0;}");
        css.push(".god_clock .num{display:block;width:" + this._width + "px;height:" + this._height + "px;}");
        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = css.join(" ");
        } else {
            style.appendChild(document.createTextNode(css.join(" ")));
        }
        document.getElementsByTagName("head")[0].appendChild(style);
        Clock.isInitCss = true;
    }
}

Clock.prototype.createWrap = function() {
    var div = document.createElement("div");
    div.className = "god_clock";
    div.innerHTML = "<ul class='clock_con'></ul>";
    this.wrap.appendChild(div);
    //this.con = this.wrap.getElementsByClassName("clock_con")[0];
    this.con = Clock.getElementsByClassName("clock_con", this.wrap)[0];
};
Clock.prototype.createUI = function() {
    function createImg(num) {
        var img = document.createElement("img");
        img.className = "num";
        img.setAttribute("src", "imgs/" + num + ".JPG");
        return img;
    }
    var con = this.con,
        li, img_con,
        img_totals = [2, 9, -1, 5, 9, -1, 5, 9];
    for (var i = 0; i < 8; i++) {
        li = document.createElement("li");
        li.className = "column";
        img_con = document.createElement("div");
        img_con.className = "img_con";
        if (i % 3 == 2) {
            img_con.appendChild(createImg("colon"));
            img_con.appendChild(createImg("colon2"));
            img_con.setAttribute("data-type", "colon");
            li.appendChild(img_con);
        } else {
            for (var num = 0; num <= img_totals[i]; num++) {
                img_con.appendChild(img = createImg(num));
                img_con.setAttribute("data-type", "num");
                img_con.setAttribute("data-total", img_totals[i]);
            }
            img_con.appendChild(createImg(0));
            li.appendChild(img_con);
        }
        con.appendChild(li);
    }
    con.style.width = this._width * 8 + "px";
    //this.img_cons = this.wrap.getElementsByClassName("img_con");
    this.img_cons = Clock.getElementsByClassName("img_con", this.wrap);
    //var columns = this.wrap.getElementsByClassName("column");
    var columns = Clock.getElementsByClassName("column", this.wrap);
    for (var i = 0; i < columns.length; i++) {
        columns[i].style.width = this._width + "px";
        columns[i].style.height = this._height + "px";
    }
    //var nums = this.wrap.getElementsByClassName("num");
    var nums = Clock.getElementsByClassName("num", this.wrap);
    for (var i = 0; i < nums.length; i++) {
        nums[i].style.width = this._width + "px";
        nums[i].style.height = this._height + "px";
    }
}
Clock.prototype.start = function() {
    var self = this,
        last = null,
        now = null;

    function tick(time) {

        now = self.now();
        if (last != now) {
            self.changeStatus(now);
            last = now;
        }
        self.run();
        self.requestAnimationFrame(tick);
    }
    self.requestAnimationFrame(tick);
    return this;
}
Clock.prototype.run = function() {
    var icon = null;
    if (this.step_tick > 29) {
        icon = this.img_cons[2];
        icon.style.top = (icon.offsetTop == -this._height ? 0 : -this._height) + "px";
        icon = this.img_cons[5];
        icon.style.top = (icon.offsetTop == -this._height ? 0 : -this._height) + "px";
        this.step_tick = 0;
    }
    for (var i = 0; i < 8; i++) {
        if (i % 3 == 2)
            continue;
        icon = this.img_cons[i];
        if (icon.isInit == undefined) {
            icon.isInit = true;
            icon._from = icon.offsetTop;
            icon.step_run = 0;
            icon.total = Number(icon.getAttribute("data-total"));
            icon.need_reset = false;
        }
        icon._to = -Number(icon.getAttribute("data-cur")) * this._height;
        if (icon._from == -this._height * icon.total && icon._to == 0) {
            icon._to = -this._height * (icon.total + 1);
            icon.need_reset = true;
        }
        if (icon._from == icon._to) continue;
        if (icon.step_run < 16) {
            icon.style.top = icon._from + (icon._to - icon._from) * icon.step_run / 15 + "px";
            icon.step_run++;
        } else {
            icon.step_run = 0;
            icon.isInit = undefined;
            if (icon.need_reset) {
                icon.style.top = "0px";
            }
            icon.need_reset = false;
        }
    }
    this.step_tick++;
}
Clock.prototype.changeStatus = function(now) {
    var nowArray = now.split(""),
        icon = null;
    for (var i = 0; i < 8; i++) {
        icon = this.img_cons[i];
        if (i % 3 == 2)
            continue;
        icon.setAttribute("data-cur", nowArray[i]);

    }
}
Clock.prototype.requestAnimationFrame = function(callback) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
    } else if (window.webkitRequestAnimationFrame) {
        return window.webkitRequestAnimationFrame(callback);
    }
    return window.setTimeout(callback, 1000 / 60);
}
Clock.prototype.cancelAnimationFrame = function(id) {
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    } else if (window.webkitCancelAnimationFrame) {
        return window.webkitCancelAnimationFrame(id);
    }
    return window.clearTimeout(id);
}
Clock.prototype.now = function() {
    var now = new Date(),
        h, m, s;
    h = this.leftPad(now.getHours());
    m = this.leftPad(now.getMinutes());
    s = this.leftPad(now.getSeconds());
    return h + ":" + m + ":" + s;
};
Clock.prototype.leftPad = function(num) {
    var str = num.toString();
    return str.length < 2 ? "0" + str : str;
};

window.onload = function() {
    Clock("clock").start();
    Clock("clock2", { width: 50, height: 80 }).start();
}

/*
function inherit(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
}

function deepCopy(p, c) {　　　　
    var c = c || {};　　　　
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}
*/