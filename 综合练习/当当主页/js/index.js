// import {Util} from './lib/Util';
require('./lib/Polyfill');
var Util = require('./lib/Util');
var Tab = require('./lib/Tab');
var BookTopTabPanel = require('./lib/BookTopTabPanel');
var TabWithBannerPanel = require('./lib/TabWithBannerPanel');
var ScrollBanner = require('./lib/ScrollBanner');
var CountDown = require('./lib/CountDown');
var MainBanner = require('./lib/MainBanner');

require('../css/index');
require('../css/buynow_ad');
require('../css/remain_panel');
require('../css/book_panel');
require('../css/clothes_panel');
require('../css/normal_panel');
require('../css/baby_panel');
require('../css/stationery_panel');
require('../css/product_list_panel');
require('../css/footer_panel');


window.onload = function() {


    Util.$("top_menu_area").onmouseover = function() {
        Util.addClass(this, "area_active");
    };

    Util.$("top_menu_area").onmouseout = function() {
        Util.removeClass(this, "area_active");
    };

    ["top_menu_mydd", "top_menu_buy", "top_menu_service"].forEach(function(className) {
        Util.$(className).onmouseover = function() {
            Util.addClass(this, "active");
        }
        Util.$(className).onmouseout = function() {
            Util.removeClass(this, "active");
        }
    })

    var menus_con = Util.$("nav_menus");
    var menus = Util.$("menus_con", menus_con).getElementsByTagName("li");
    var menusDetail = Util.$("nav_menu_detail", menus_con);
    for (var i = 0; i < menus.length; i++) {
        menus[i].index = i;
        menus[i].onmouseover = function() {
            Util.addClass(this, "active");
        }
        menus[i].onmouseout = function() {
            Util.removeClass(this, "active");
        }
    }
    menus_con.onmouseover = function() {
        menusDetail.style.display = 'block';
    }
    menus_con.onmouseout = function() {
        menusDetail.style.display = 'none';
    }



    MainBanner.init().autoPlay();
    new CountDown({ "id": "countDown", endTime: new Date().getTime() + 5 * 60 * 60 * 1000 }).start();

    new Tab({
        "con": "note_tabpanel",
        "contents": "content",
        "interval": 3500,
        "autoPlay": true
    });

    new Tab({
        "con": "buynow_tabpanel",
        "titles": "circle",
        "contents": "banner",
        "interval": 3000,
        "autoPlay": true
    });

    new BookTopTabPanel({
        "con": "book_panel_right_tab_panel",
        "head": "right_head",
        "contents": "right_booklist"
    });


    new ScrollBanner({
        "itemWidth": 202,
        "bannerID": "navScroolBanner",
        "wrapClassName": "banners_wrap",
        "itemClassName": "banner",
        "easeFun": "linear",
        "steps": 30,
        "autoPlay": true
    });


    new TabWithBannerPanel({
        "con": "book_panel_left_tab_panel",
        "head": "titles_con",
        "contents": "left_tab_content",
        "bannerConfig": {
            "className": "left_baner",
            "itemWidth": 335
        }
    });

    new TabWithBannerPanel({
        "con": "clothes_tab_panel",
        "head": "titles_con",
        "contents": "content",
        "bannerConfig": {
            "className": "center_banner",
            "itemWidth": 383
        }
    });


    new ScrollBanner({
        "itemWidth": 119,
        "pageNum": 10,
        "bannerID": "clothes_footer_banner",
        "wrapClassName": "links_wrap",
        "itemClassName": "link",
        "easeFun": "easeOutBack",
        "steps": 60,
        "interval": 2500,
        "autoPlay": true
    });

    new ScrollBanner({
        "itemWidth": 314,
        "bannerID": "baby_panel_banner",
        "wrapClassName": "banners_wrap",
        "itemClassName": "banner",
        "steps": 60,
        "interval": 2500,
        "autoPlay": true
    });





}