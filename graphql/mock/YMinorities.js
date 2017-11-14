const random = require('./Util')["random"];
const _minorities = "壮族,藏族,裕固族,彝族,瑶族,锡伯族,乌孜别克族,维吾尔族,佤族,土家族,土族,塔塔尔族,塔吉克族,水族,畲族,撒拉族,羌族,普米族,怒族,纳西族,仫佬族,苗族,蒙古族,门巴族,毛南族,满族,珞巴族,僳僳族,黎族,拉祜族,柯尔克孜族,景颇族,京族,基诺族,回族,赫哲族,哈萨克族,哈尼族,仡佬族,高山族,鄂温克族,俄罗斯族,鄂伦春族,独龙族,东乡族,侗族,德昂族,傣族,达斡尔族,朝鲜族,布依族,布朗族,保安族,白族,阿昌族,汉族".split(",");
module.exports = {
    YMinorities: function() {
        return _minorities[random(0, _minorities.length - 1)];
    }
}