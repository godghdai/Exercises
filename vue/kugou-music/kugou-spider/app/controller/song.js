function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {

  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var result = yield _this.getHtml("http://m.kugou.com/", function ($) {
        let data = {
          "banners": [],
          "songs": []
        };
        $('.swipe-wrap a').each(function (i, elem) {
          let item = $(this);
          data["banners"][i] = {
            url: item.attr("href"),
            img: item.find("img").attr("src")
          };
        });

        $('.panel-songslist-item').each(function (i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });

      return _this.success(result);
    })();
  }

  topAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this2.getHtml("http://m.kugou.com/rank/list", function ($) {
        let data = [];
        $('.panel-img-list li').each(function (i, elem) {
          let item = $(this);
          data[i] = {
            url: item.find("a").attr("href"),
            img: item.find(".panel-img-left img").attr("src"),
            title: item.find(".panel-img-content").text().trim()
          };
        });
        return data;
      });
      return _this2.success(result);
    })();
  }

  topDetailAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this3.getHtml("http://m.kugou.com/rank/info/6666", function ($) {
        let data = {
          "img": $(".rank-info-hd img").attr("src"),
          "time": $(".rank-info-hd .rank-info-time").text().trim(),
          "songs": []
        };
        $('.panel-songslist-item').each(function (i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim(),
            order: item.find(".panel-songs-item-num").text().trim()
          };
        });
        return data;
      });
      return _this3.success(result);
    })();
  }

  playListAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this4.getHtml("http://m.kugou.com/plist/index", function ($) {
        let data = [];
        $('.panel-img-list li').each(function (i, elem) {
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
      return _this4.success(result);
    })();
  }

  playListDetailAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this5.getHtml("http://m.kugou.com/plist/list/191005", function ($) {
        let data = {
          "img": $("#imgBoxInfo img").attr("src"),
          "title": $(".page-title").text().trim(),
          "detail": $("#introBox").text().trim(),
          "songs": []
        };
        $('.panel-songslist-item').each(function (i, elem) {
          let item = $(this);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });
      return _this5.success(result);
    })();
  }

  classAction() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this6.getHtml("http://m.kugou.com/singer/class", function ($) {
        let data = [];
        let sub;
        $('.singer-class-list').each(function (i, elem) {
          sub = [];
          let item = $(this);
          item.find("li a").each(function (subIndex, subElem) {
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
      return _this6.success(result);
    })();
  }

  singerListAction() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this7.getHtml("http://m.kugou.com/singer/list/88", function ($) {
        let data = [];
        $('.singer-img-list li').each(function (i, elem) {
          let item = $(this);
          data[i] = {
            url: item.find("a").attr("href"),
            img: item.find("a img").attr("_src"),
            title: item.find(".panel-img-content-first").text().trim()
          };
        });
        return data;
      });
      return _this7.success(result);
    })();
  }

  singerAction() {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      var result = yield _this8.getHtml("http://m.kugou.com/singer/info/3520", function ($) {
        let data = {
          "img": $("#imgBoxInfo img").attr("src"),
          "title": $(".page-title").text().trim(),
          "detail": $("#introBox").text().trim(),
          "songs": []
        };
        $('.panel-songslist li').each(function (i, elem) {
          let item = $(this);
          console.log(i);
          data["songs"][i] = {
            id: item.attr("id"),
            title: item.find(".panel-songs-item-name").text().trim()
          };
        });
        return data;
      });
      return _this8.success(result);
    })();
  }

};
//# sourceMappingURL=song.js.map