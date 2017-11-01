const Base = require('./base.js');

module.exports = class extends Base {

    async indexAction() {
        var result = await this.getHtml("http://m.kugou.com/", function($) {
            let data = {
                "banners": [],
                "songs": []
            };
            $('.swipe-wrap a').each(function(i, elem) {
                let item = $(this);
                data["banners"][i] = {
                    url: item.attr("href"),
                    img: item.find("img").attr("src")
                };
            });

            $('.panel-songslist-item').each(function(i, elem) {
                let item = $(this);
                data["songs"][i] = {
                    id: item.attr("id"),
                    title: item.find(".panel-songs-item-name").text().trim()
                };
            });
            return data;
        });

        return this.success(result);
    }

    async topAction() {
        var result = await this.getHtml("http://m.kugou.com/rank/list", function($) {
            let data = []
            $('.panel-img-list li').each(function(i, elem) {
                let item = $(this);
                data[i] = {
                    url: item.find("a").attr("href"),
                    img: item.find(".panel-img-left img").attr("src"),
                    title: item.find(".panel-img-content").text().trim()
                };
            });
            return data;
        });
        return this.success(result);
    }

    async topDetailAction() {
        var result = await this.getHtml("http://m.kugou.com/rank/info/6666", function($) {
            let data = {
                "img": $(".rank-info-hd img").attr("src"),
                "time": $(".rank-info-hd .rank-info-time").text().trim(),
                "songs": []
            };
            $('.panel-songslist-item').each(function(i, elem) {
                let item = $(this);
                data["songs"][i] = {
                    id: item.attr("id"),
                    title: item.find(".panel-songs-item-name").text().trim(),
                    order: item.find(".panel-songs-item-num").text().trim()
                };
            });
            return data;
        });
        return this.success(result);
    }

    async playListAction() {
        var result = await this.getHtml("http://m.kugou.com/plist/index", function($) {
            let data = [];
            $('.panel-img-list li').each(function(i, elem) {
                let item = $(this);
                data[i] = {
                    url: item.find("a").attr("href"),
                    img: item.find(".panel-img-left img").attr("_src"),
                    title: item.find(".panel-img-content-first").text().trim(),
                    playcount: item.find(".panel-img-content-sub").text().trim()
                };
            });
            return data;
        });
        return this.success(result);
    }

    async playListDetailAction() {
        var result = await this.getHtml("http://m.kugou.com/plist/list/191005", function($) {
            let data = {
                "img": $("#imgBoxInfo img").attr("src"),
                "title": $(".page-title").text().trim(),
                "detail": $("#introBox").text().trim(),
                "songs": []
            };
            $('.panel-songslist-item').each(function(i, elem) {
                let item = $(this);
                data["songs"][i] = {
                    id: item.attr("id"),
                    title: item.find(".panel-songs-item-name").text().trim()
                };
            });
            return data;
        });
        return this.success(result);
    }

    async classAction() {
        var result = await this.getHtml("http://m.kugou.com/singer/class", function($) {
            let data = [];
            let sub;
            $('.singer-class-list').each(function(i, elem) {
                sub = [];
                let item = $(this);
                item.find("li a").each(function(subIndex, subElem) {
                    let sub_item = $(this);
                    sub.push({
                        id: sub_item.attr("href"),
                        title: sub_item.text().trim()
                    });
                });
                data.push(sub);
            });
            return data;
        });
        return this.success(result);
    }

    async singerListAction() {
        var result = await this.getHtml("http://m.kugou.com/singer/list/88", function($) {
            let data = [];
            $('.singer-img-list li').each(function(i, elem) {
                let item = $(this);
                data[i] = {
                    url: item.find("a").attr("href"),
                    img: item.find("a img").attr("_src"),
                    title: item.find(".panel-img-content-first").text().trim()
                };

            });
            return data;
        });
        return this.success(result);
    }


    async singerAction() {

        console.log(this.get("url"));

        var result = await this.getHtml("http://m.kugou.com/singer/info/3060", function($) {
            let data = {
                "img": $("#imgBoxInfo img").attr("src"),
                "title": $(".page-title").text().trim(),
                "detail": $("#introBox").text().trim(),
                "songs": []
            };
            $('.panel-songslist li').each(function(i, elem) {
                let item = $(this);
                data["songs"][i] = {
                    id: item.attr("id"),
                    title: item.find(".panel-songs-item-name").text().trim()
                };
            });
            return data;
        });
        return this.success(result);
    }



};