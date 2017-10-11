 define(["Util"], function(Util) {
     var submenus = Util.$$("submenus");
     var menus = Util.$$("main_menus").getElementsByTagName("li");
     for (var i = 0, length = menus.length; i < length; i++) {
         menus[i].onmouseover = function() {
             Util.removeClass(submenus,'hide')
         }
         menus[i].onmouseout = function() {
             Util.addClass(submenus,'hide')
         }
     }


 })