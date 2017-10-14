 var Tab = require('./Tab');
 var Util = require('./Util');
 var ScrollBanner = require('./ScrollBanner');

 function TabWithBannerPanel(config) {
     this.bannerWidth = config.bannerConfig.itemWidth;
     this.bannerClassName = config.bannerConfig.className;
     Tab.call(this, config);

 }
 Util.inherit(TabWithBannerPanel, Tab);
 TabWithBannerPanel.prototype.initComplete = function() {
     var self=this;
     this.scrollBanners = [];
     var tabId = this.config.con;
     var contents = this.contents;
     for (var i = 0; i < contents.length; i++) {
         var baner = Util.$(this.bannerClassName, contents[i]);
         baner.id = tabId + i;
         this.scrollBanners.push(new ScrollBanner({
             "itemWidth": this.bannerWidth,
             "bannerID": baner.id,
             "wrapClassName": "banners_wrap",
             "itemClassName": "banner",
             "easeFun": "easeOutCubic",
             "step":50,
             "autoPlay": true
         }));
     }
 }
 module.exports = TabWithBannerPanel;