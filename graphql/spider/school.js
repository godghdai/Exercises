//爬取学校信息
const fetch = require('node-fetch');
var request = require('superagent');
require('superagent-proxy')(request);
const cheerio = require('cheerio');
const async = require("async");
const R = require('ramda');
const schoolModel = require('../db')["schoolModel"];
/*
const Rx=require("rxjs");
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

observable.subscribe(x => console.log(x));*/

var proxy = 'http://114.99.5.80:808';

var base_url = "http://school.zhongkao.com/province/3676/";
var pageToPromise = page => {
    var url = `${base_url}p${page}/`;
    return new Promise(function(resolve, reject) {
        async.retry({ times: 3, interval: 200 }, function(retry_callback) {


            fetch(url)
                .then(function(res) {
                    return res.text();
                }).then(function(res) {
                    retry_callback(null, res);
                }).catch(function(err) {
                    retry_callback(err);
                });


        }, function(err, result) {
            if (err) console.log(err);
            resolve({
                "success": err ? false : true,
                "url": url,
                "data": err ? err.toString() : result
            });
        });
    });
};


(async function start() {
    var limit = 1;
    var firstpage = await fetch(base_url).then(res => res.text());
    var total = cheerio.load(firstpage)(".page_Box").children().eq(-2).text();
    //var total = 158;
    var total_page = Math.ceil(total / limit);
    var page = 1;
    var data = [];
    while (page < total_page) {
        var start = (page - 1) * limit + 1;
        var end = start + limit;
        var result = await Promise.all(R.map(pageToPromise, R.range(start, R.min(end, total + 1))));

        for (var i = 0; i < result.length; i++) {
            //console.log(result[i].success)
            var $ = cheerio.load(result[i].data);
            $(".filtschinfo h3").each(function(index, el) {
                data.push($(el).text());
                console.log($(el).text());
            });
        }
        page++;
    }

    schoolModel.bulkCreate(data.map((item) => {
        return {
            name: item
        }
    })).then(() => {})
    console.log(data.length);

    // console.log(result);
})().then(a => a).catch(ex => console.log(ex));