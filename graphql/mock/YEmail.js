var random = require('./Util')["random"];
var HasNumber = 1;
var _first = "abcdefghijklmnopqrstuvwxyz";
var _last = "@gmail.com,@yahoo.com,@msn.com,@hotmail.com,@aol.com,@ask.com,@live.com,@qq.com,@0355.net,@163.com,@163.net,@263.net,@3721.net,@yeah.net,@googlemail.com,@126.com,@sina.com,@sohu.com,@yahoo.com.cn".split(",");
module.exports = {
    YEmail: function() {
        var num = "",
            n_length, l_length, letters = "";
        if (HasNumber == random(0, 1)) {
            n_length = random(0, 4);
            while (n_length) {
                num += random(0, 9) + "";
                n_length--;
            }
        }
        l_length = random(2, 5);
        while (l_length) {
            letters += _first[random(0, _first.length-1)];
            l_length--;
        }
        return letters + num + _last[random(0, _last.length-1)];
    }
}