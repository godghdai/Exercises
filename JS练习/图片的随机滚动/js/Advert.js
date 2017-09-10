define(["Util", "AdvertItem", "TimeLine"], function(Util, AdvertItem, TimeLine) {
    function Advert() {
        this.timeline = TimeLine();
    }
    Advert.prototype.init = function() {
        var con = document.createElement("div");
        con.className = "god_advert clearfix";
        var start = 1,
            advertItem = null;
        for (var k = 0; k < 9; k++) {
            var data = [],
                end = 22; 
            for (var i = start; i <= end; i++) {
                data.push({ "name": "imgs/mm/"+i+".jpg" });
            }
            advertItem = new AdvertItem(data);
            this.timeline.addListener(advertItem);
            con.innerHTML += advertItem.createHtml();
           start++;
        }
        document.body.appendChild(con);
        this.timeline.start();
    }
    return Advert;
});