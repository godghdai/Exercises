const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = {
    get: async function(url) {
        let res = await fetch(url).then(res => {
            "success": true,
            "data": res.text()
        }).catch(
            err => {
                "success": false,
                "msg": err.toString()
            });

        if (res.success)
            return cheerio.load(res.data);
        return res;
    }
}











        /*
            request
                .get(url)
                .set({
                    Accept: "*/*",
                   'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    'Accept-Encoding': 'gzip, deflate',
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36",
                })
                .proxy(proxy)
                .end(function(err, res) {
                    if (err) {
                        // console.log(err);
                        retry_callback(err);
                    } else {
                        //console.log(res.status, res.headers);
                        //console.log(res.body);
                        retry_callback(null, res.body);
                    }
                });*/