(function(fun) {
    window.onload = function() { fun && fun.call() }
})(function() {
    var con = document.getElementsByClassName("module-con")[0],
        result = "";
    for (var i = 1; i <= 16; i++) {

        result += document.getElementById("tpl").innerHTML.replace(/{(\w+)}/g, function(match, $1) { return { title: "图片" + i, "name": i }[$1]; });
    }
    con.innerHTML = result;

    var posArray = [];
    var modules = document.getElementsByClassName("module");
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

    var zIndexMax = 1;
    var module_titles = document.getElementsByClassName("module-title");
    for (var i = 0; i < module_titles.length; i++) {
        module_titles[i].onmousedown = function(event) {
            event.preventDefault();
            var module = this.parentNode;
            // this.style.background = 'red';
            module.style.zIndex = ++zIndexMax;
            var event = event || window.event;
            //console.log(event.pageX)
            var dis_x = event.pageX - (module.offsetLeft + con.offsetLeft);
            var dis_y = event.pageY - (module.offsetTop + con.offsetTop);
            document.onmousemove = function(event) {
                var event = event || window.event;

                var left = event.pageX - (con.offsetLeft + dis_x);
                var top = event.pageY - (con.offsetTop + dis_y);

                if (left < 0) left = 0;
                if (top < 0) top = 0;

                if (left > (con.offsetWidth - module.offsetWidth)) left = con.offsetWidth - module.offsetWidth;
                if (top > (con.offsetHeight - module.offsetHeight)) top = con.offsetHeight - module.offsetHeight;
                module.style.left = left + "px";
                module.style.top = top + "px";;

            }
        }

        module_titles[i].onmouseup = function() {
            document.onmousemove = null;
            move(this.parentNode);
        }
    }




    function findModuleByIndex(index) {
        for (var i = 0; i < modules.length; i++) {
            if (modules[i].index == index) return modules[i];
        }
    }


    function move(module) {

        var dis_index = getMinDistanceIndex(module);
        var moveModules = [];
        var direction = "none";
        //上移
        if (dis_index < module.index) {　　　　　　　
            for (var i = module.index - 1; i >= dis_index; i--) {
                moveModules.push(findModuleByIndex(i));
                //modules[i].style.background = 'red';
            }
            direction = "movedown";
        } //下移
        else {
            for (var i = module.index + 1; i <= dis_index; i++) {
                moveModules.push(findModuleByIndex(i));
                //modules[i].style.background = 'red';
            }
            direction = "moveup";
        }
        /*
        console.log(dis_index);
        var pos;
        pos = posArray[dis_index];
        module.style.left = pos["left"] + "px";
        module.style.top = pos["top"] + "px";
        module.index = dis_index;

        console.log("start.....");

        for (var i = 0; i < moveModules.length; i++) {

            if (direction == "movedown") {
                pos = posArray[moveModules[i].index + 1];
            } else {
                pos = posArray[moveModules[i].index - 1];
            }

            var d_left = pos["left"];
            var d_top = pos["top"];
            var text = moveModules[i].getElementsByClassName("module-title")[0].innerText;

            moveModules[i].style.left = d_left + "px";
            moveModules[i].style.top = d_top + "px";

            console.log(text, "d_top:", d_top, "d_left:", d_left);
        }
        for (var i = 0; i < moveModules.length; i++) {
            if (direction == "movedown") {
                moveModules[i].index += 1;

            } else {
                moveModules[i].index -= 1;
            }

        }*/


        var timer = null;
        clearInterval(timer);
        var step = 1,
            total_step = 50;
        timer = setInterval(function() {
            if (step == total_step) {
                clearInterval(timer);
                for (var i = 0; i < moveModules.length; i++) {
                    if (direction == "movedown") {
                        moveModules[i].index += 1;
                        continue;
                    }
                    moveModules[i].index -= 1;
                }
                module.index = dis_index;
            }


            for (var i = 0; i < moveModules.length; i++) {

                if (!moveModules[i].param) {
                    var param = {};
                    var pos = direction == "movedown" ? posArray[moveModules[i].index + 1] : posArray[moveModules[i].index - 1];
                    param["d_left"] = pos["left"];
                    param["d_top"] = pos["top"];
                    moveModules[i].param = param;
                }

                var _param = moveModules[i].param;
                if (moveModules[i].offsetTop != _param["d_top"] ||
                    moveModules[i].offsetLeft != _param["d_left"]) {
                    var topOffset = (_param["d_top"] - moveModules[i].offsetTop) * step / total_step;
                    var leftOffset = (_param["d_left"] - moveModules[i].offsetLeft) * step / total_step;
                    moveModules[i].style.top = moveModules[i].offsetTop + topOffset + "px";
                    moveModules[i].style.left = moveModules[i].offsetLeft + leftOffset + "px";

                }

            }
             step++;
        }, 16)

    }


    function getMinDistanceIndex(module) {
        var minIndex = -1,
            minDistance = null,
            dis;
        for (var i = 0; i < modules.length; i++) {
            if (module != modules[i]) {
                dis = getDistance(module, modules[i]);
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

    function getDistance(module, module2) {
        var height = module.offsetTop - module2.offsetTop;
        var width = module.offsetLeft - module2.offsetLeft;
        //module2.style.background = '#fff';
        return Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    }






});