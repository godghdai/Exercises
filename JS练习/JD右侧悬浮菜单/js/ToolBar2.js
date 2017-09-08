define(['jquery','FollowPanel2','Animate'], function($,followPanel,Animate) {
    var STATUS_OPEN = true,
        STATUS_CLOSED = false,
        defaultConfig = {
            "status": STATUS_CLOSED,
            "el": ".toolbar"
        },
        SHOW_ZINDEX = 5,
        HIDE_ZINDEX = 1;

    function ToolBar(config) {
        if (!(this instanceof ToolBar)) return new ToolBar(config);
        var config = this.config = $.extend({}, defaultConfig, config || {});
        this.status = config["status"];
        this.el = null;
        this.ico_buttons == null;
        this.cur_index = 0;
        this.panels = null;
    }
    ToolBar.prototype.init = function() {
        var self = this;
        var el = this.el = $(this.config["el"]);
        var ico_buttons = this.ico_buttons = el.find(".tab_head .item_con");
        var panels = this.panels = el.find(".tab_con .panel");

        $.each(ico_buttons, function(index, element) {
            $(element).data("index", index);
            if (index == self.cur_index) $(element).addClass('active');
        });
        $.each(panels, function(index, element) {
            $(element).data("index", index);
            if (index == self.cur_index)
                $(element).css("zIndex", SHOW_ZINDEX).show();
            else
                $(element).css("zIndex", HIDE_ZINDEX).hide();

        });
        this.changeStatus(this.status);
        var heigth = $(window).height();
        followPanel(this.el.find(".tab_con .follow_panel")).init();
        this.bindEvent();
    };
    ToolBar.prototype.switchPanel = function(next_index) {
        var panels = this.panels,
            cur_index = this.cur_index;
        if (next_index > panels.length - 1) {
            console.log("没有实现");
            return;
        }
        var cur_panel = $(panels[cur_index]);
        var next_panel = $(panels[next_index]);
        cur_panel.css("zIndex", HIDE_ZINDEX);
        Animate(cur_panel,{left:270},300,function(){
            cur_panel.hide();
        });
        next_panel.css("zIndex", SHOW_ZINDEX);
        next_panel.show();
        Animate(next_panel,{left:0},300);
        this.cur_index = next_index;
    }
    ToolBar.prototype.changeStatus = function(status) {
        var el = this.el;
        el.css("right", status == STATUS_CLOSED ? -270 : 0);
        if (el.is(":hidden")) el.show();
        this.status = status;
    }

    ToolBar.prototype.bindEvent = function() {
        var self = this;
        this.ico_buttons.click(function() {
            var clicked = $(this);
            self.el.find(".tab_head .active").removeClass('active')
            clicked.addClass('active');

            if (self.status == STATUS_CLOSED) {
                self.changeStatus(STATUS_OPEN);
                return;
            }
            if (self.cur_index == clicked.data("index")) {
                self.changeStatus(STATUS_CLOSED);
                return;
            }
            self.switchPanel(clicked.data("index"));

        });

        this.el.find(".panel .head .ico_close").click(function() {
            self.changeStatus(STATUS_CLOSED);
        });

        this.ico_buttons.mouseover(function(event) {
            Animate($(this).find('.tip'),{left:-71},200);
        });

        this.ico_buttons.mouseout(function(event) {
            Animate($(this).find('.tip'),{left:0},200);
        });

    };
    return ToolBar;
});