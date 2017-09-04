(function(fun) {
    window.onload = function() { fun && fun.call() }
})(function() {

    function PhotoWall() {
        this.zIndexMax = 1;
        this.con = null;
        this.modules = null;
        this.module_titles = null;
        this.posArray = [];
        this.init();
    }
    PhotoWall.prototype.init = function() {
        var con = this.con = document.getElementsByClassName("module-con")[0];
        var modules = this.modules = document.getElementsByClassName("module");
        this.module_titles = document.getElementsByClassName("module-title");

        var result = "";
        for (var i = 1; i <= 16; i++)
            result += document.getElementById("tpl").innerHTML.replace(/{(\w+)}/g, function(match, $1) { return { title: "图片" + i, "name": i }[$1]; });
        con.innerHTML = result;


        var posArray = this.posArray;
        for (var i = 0; i < modules.length; i++)
            posArray.push({ top: modules[i].offsetTop, left: modules[i].offsetLeft });


        for (var i = 0; i < modules.length; i++) {
            modules[i].index = i;
            with(modules[i].style) {
                position = 'absolute';
                top = posArray[i]["top"] + "px";
                left = posArray[i]["left"] + "px";
            }
        }
        this.dragInit();
    }
    PhotoWall.prototype.dragInit = function() {
        var self = this;
        var module_titles = self.module_titles;
        var con = self.con;
        var con_left = con.offsetLeft;
        var con_top = con.offsetTop;
        var con_width = con.offsetWidth;
        var con_height = con.offsetHeight;
        var mod_width, mod_height;

        for (var i = 0; i < module_titles.length; i++) {
            module_titles[i].onmousedown = function(event) {
                event.preventDefault();
                var module = this.parentNode;
                module.style.zIndex = self.getNewIndex();
                var event = event || window.event;
                var dis_x = event.pageX - (module.offsetLeft + con_left);
                var dis_y = event.pageY - (module.offsetTop + con_top);

                module_width = module.offsetWidth;
                module_height = module.offsetHeight;
                document.onmousemove = function(event) {
                    var event = event || window.event;

                    var left = event.pageX - (con_left + dis_x);
                    var top = event.pageY - (con_top + dis_y);

                    if (left < 0) left = 0;
                    if (top < 0) top = 0;

                    if (left > (con_width - mod_width)) left = con_width - mod_width;
                    if (top > (con_height - mod_height)) top = con_height - mod_height;
                    module.style.left = left + "px";
                    module.style.top = top + "px";;

                }
            }

            module_titles[i].onmouseup = function() {
                document.onmousemove = null;
                self.startMoveAnimation(this.parentNode);
            }
        }
    }


    PhotoWall.prototype.findModuleByIndex = function(index) {
        var modules = this.modules;
        for (var i = 0; i < modules.length; i++) {
            if (modules[i].index == index) {
                modules[i].style.zIndex = this.getNewIndex();
                return modules[i];
            }

        }
    }

    PhotoWall.prototype.getMinDistanceIndex = function(module) {
        var modules = this.modules;
        var minIndex = -1,
            minDistance = null,
            dis;

        for (var i = 0; i < modules.length; i++) {
            if (module != modules[i]) {
                dis = this.getDistance(module, modules[i]);
                if (minDistance != null) {
                    if (dis < minDistance) {
                        minDistance = dis;
                        minIndex = modules[i].index;
                    }
                    continue;
                }
                if (minDistance == null) {
                    minDistance = dis;
                    minIndex = modules[i].index;
                }

            }
        }
        return minIndex;
    }

    PhotoWall.prototype.getDistance = function(module, module2) {
        var height = module.offsetTop - module2.offsetTop;
        var width = module.offsetLeft - module2.offsetLeft;
        return Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    }

    PhotoWall.prototype.startMoveAnimation = function(module) {

        var posArray = this.posArray;
        var dis_index = this.getMinDistanceIndex(module);
        var moveModules = [];
        var direction = "none";
        //上移
        if (dis_index < module.index) {
            direction = "movedown";　　　　　　　
            for (var i = module.index - 1; i >= dis_index; i--)
                moveModules.push(this.findModuleByIndex(i));

        } //下移
        else {
            direction = "moveup";
            for (var i = module.index + 1; i <= dis_index; i++)
                moveModules.push(this.findModuleByIndex(i));

        }

        module.style.left = posArray[dis_index]["left"] + "px";
        module.style.top = posArray[dis_index]["top"] + "px";
        module.index = dis_index;

        var timer = null;
        clearInterval(timer);
        var step = 1,
            total_step = 10;
        timer = setInterval(function() {

            for (var i = 0; i < moveModules.length; i++) {

                if (!moveModules[i].param) {
                    var param = {};
                    var pos = direction == "movedown" ? posArray[moveModules[i].index + 1] : posArray[moveModules[i].index - 1];
                    param["d_left"] = pos["left"];
                    param["d_top"] = pos["top"];
                    param["_step_left"] = pos["left"] - moveModules[i].offsetLeft;
                    param["_step_top"] = pos["top"] - moveModules[i].offsetTop;
                    param["s_left"] = moveModules[i].offsetLeft;
                    param["s_top"] = moveModules[i].offsetTop;
                    moveModules[i].param = param;
                }

                var _param = moveModules[i].param;
                moveModules[i].style.left = _param["s_left"] + _param["_step_left"] * step / total_step + "px";
                moveModules[i].style.top = _param["s_top"] + _param["_step_top"] * step / total_step + "px";

            }

            if (step == total_step) {
                clearInterval(timer);

                for (var i = 0; i < moveModules.length; i++) {
                    moveModules[i].param = null;
                    if (direction == "movedown") {
                        moveModules[i].index += 1;
                        continue;
                    }
                    moveModules[i].index -= 1;
                }

            }

            step++;
        }, 16)

    }
    PhotoWall.prototype.getNewIndex = function() {
        return ++this.zIndexMax;
    }

    new PhotoWall().init();

});