var random = require('./Util')["random"];
var _first = "134,135,136,137,138,139,150,151,152,157,158,159,130,131,132,155,156,133,153".split(",");
module.exports = {
    YTel: function() {
        var first = _first[random(0, _first.length - 1)];
        var second =(random(1, 888) + 10000).toString().substring(1);
        var third = (random(1, 9100) + 10000).toString().substring(1);
        return first + second+ third;
    }
}