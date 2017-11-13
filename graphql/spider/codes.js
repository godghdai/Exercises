const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('mz/fs');
const baseUrl = "http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/";
(async function() {

    var res, $, url;
    //获取 最新县及县以上行政区划代码 链接
    res = await fetch(baseUrl).then(res => res.text());
    $ = cheerio.load(res);
    url = $(".center_list_contlist li").first().children("a").attr("href");
    res = await fetch(baseUrl + url).then(res => res.text());
    $ = cheerio.load(res);

    var result = [];
    var ps = $(".TRS_PreAppend p");
    for (var i = 0; i < ps.length; i++) {
        var childs = $(ps[i]).children().not((i, el) => $(el).text().trim() == "");
        var code = childs.eq(0).text().trim();
        var title = childs.eq(1).text().trim();
        result.push({ code: code, title: title, lev: 3 });

        if (code.substr(-4) == "0000") {
            result[result.length - 1].lev = 1;
            continue;
        }

        if (code.substr(2, 2) != "00" && code.substr(-2) == "00") {
            result[result.length - 1].lev = 2;
        }

    }
    // 输出结果
    //console.log(JSON.stringify(data, null, 4))

    await fs.writeFile("最新县及县以上行政区划代码.json", JSON.stringify(result, null, "")).then(err => {
        //console.log('save !!')
    });



})().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});