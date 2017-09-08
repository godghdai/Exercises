define(['jquery'], function($) {
    function FollowPanel(el) {
        if (!(this instanceof FollowPanel)) return new FollowPanel(el);
        this.$el = el;
        this.con = el.find(".content_wrap");
    }
    FollowPanel.prototype.init = function() {
        var self = this;
        var $el = this.$el;

        //$el.find(".content_wrap").children()
        $el.find(".follow_tab_head .tab_title").mouseover(function(event) {
            var clicked = $(this);
            self.con.css('left', -$(".content_wrap").children().eq(clicked.index()).position().left);
            $el.find(".follow_tab_head .active").removeClass('active');
            clicked.addClass('active');
        });
    };
    return FollowPanel;
});