define(["Util", "AdvertItem", "TimeLine"], function(Util, AdvertItem, TimeLine) {
    function Advert(el, option) {
        if (!(this instanceof Advert)) return new Advert(el, option);
        this.wrap = null;
        this.timeline = null;
        this.con = Util.$$(el);
        this.advertItems = [];
        this.init();
    }
    Advert.prototype.init = function() {
        this.wrap = document.createElement("div");
        this.wrap.className = "god_advert clearfix";
        this.con.appendChild(this.wrap);
        this.timeline = TimeLine();

        this.initAvertItems();
        this.wrap.innerHTML = this.advertItems.map(function(item) {
            return item.getInnerHTML();
        }).join("");

    }
    Advert.prototype.start = function() {
       this.advertItems.forEach(function(item) {
            this.timeline.addListener(item);
        }.bind(this));
        this.timeline.start();
    };
    Advert.prototype.stop = function() {
        this.advertItems.forEach(function(item) {
            this.timeline.removeListener(item);
        }.bind(this));
        this.timeline.stop();
    };
    Advert.prototype.initAvertItems = function() {
        var start = 1,
            advertItem = null;
        for (var k = 0; k < 9; k++) {
            var data = [],
                end = 22;
            for (var i = start; i <= end; i++) {
                data.push({ "name": "imgs/mm/" + i + ".jpg" });
            }
            this.advertItems.push(new AdvertItem(data));
            start++;
         
        }
    }
    return Advert;
});