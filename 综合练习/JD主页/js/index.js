require.config({
    baseUrl: './js/lib'　　
});
window.onload = function() {
    requirejs(['OpacityBanner', 'CountDown', 'TabPanel', 'NewsTabPanel','SubMenu','TabModule','ToolsPanel','ScrollBanner'], function(OpacityBanner, CountDown, TabPanel, NewsTabPanel,SubMenu,TabModule,ToolsPanel,ScrollBanner) {
        OpacityBanner({ id: "main_banner", "index": 4, interval: 3000 }).autoPlay();
        OpacityBanner({ id: "buy_now_banner", interval: 2500 }).autoPlay();
        OpacityBanner({ id: "module_tobuy_banner", itemClass: "baner", steps: 20, interval: 2000 }).autoPlay();
        OpacityBanner({ id: "module_me_banner", itemClass: "baner", steps: 20, interval: 2000 }).autoPlay();
        OpacityBanner({ id: "video_panel_banner", itemClass: "video", steps: 20, interval: 2000 }).autoPlay();
        var ie6 = !-[1, ] && !window.XMLHttpRequest;
        new CountDown({ id: "countDown", endTime: new Date().getTime() + 5 * 60 * 60 * 1000 });
        //alert(new Date().getTime())
        new TabPanel({ "className": "module_top", "leftOffset": 10 });
        new NewsTabPanel();

        TabModule.initModules();

        new ToolsPanel();

        ScrollBanner.initScrollBaner();
    });
}