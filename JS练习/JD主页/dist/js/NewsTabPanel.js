 define(["TabPanel", "Util"], function(TabPanel, Util) {
     function NewsTabPanel() {
        TabPanel.call(this, {leftOffset:0,step:8});
     }
     Util.inherit(NewsTabPanel, TabPanel);
     NewsTabPanel.prototype.init = function() {
         var con = this.con = Util.$("news_panel")[0];
         this.line = Util.$("line", con)[0];
         var titles = this.titles = [];
         this.titles.push(Util.$("promo", Util.$("head", con)[0])[0]);
         this.titles.push(Util.$("notice", Util.$("head", con)[0])[0]);
         this.banners = Util.$("news", con);
         this.initUI();
         this.initEvent();
     }
     return NewsTabPanel;

 })