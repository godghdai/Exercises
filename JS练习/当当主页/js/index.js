function removeClass(obj, sClass) {

    if (!obj.className) return;

    var aClass = obj.className.split(' ');

    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            return;
        }
    }

}

function addClass(obj, sClass) {

    if (!obj.className) {
        obj.className = sClass;
        return;
    }

    var aClass = obj.className.split(' ');

    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }

    obj.className += ' ' + sClass;

}

function getByClass(sClass, parent) {

    var aEles = (parent || document).getElementsByTagName('*');
    var arr = [];

    for (var i = 0; i < aEles.length; i++) {

        var aClass = aEles[i].className.split(' ');

        for (var j = 0; j < aClass.length; j++) {

            if (aClass[j] == sClass) {

                arr.push(aEles[i]);
                break;

            }

        }

    }

    return arr;

}

function hasClass(obj, sClass) {

    if (!obj.className) return false;

    var aClass = obj.className.split(' ');

    for (var i = 0; i < aClass.length; i++) {

        if (aClass[i] === sClass) return true;

    }

    return false;
}


window.onload = function() {
    getByClass("top_menu_area")[0].onmouseover = function() {
        addClass(this, "area_active");
    }
    getByClass("top_menu_area")[0].onmouseout = function() {
        removeClass(this, "area_active");
    }
    getByClass("top_menu_mydd")[0].onmouseover = function() {
        addClass(this, "active");
    }
    getByClass("top_menu_mydd")[0].onmouseout = function() {
        removeClass(this, "active");
    }
    getByClass("top_menu_buy")[0].onmouseover = function() {
        addClass(this, "active");
    }
    getByClass("top_menu_buy")[0].onmouseout = function() {
        removeClass(this, "active");
    }

    getByClass("top_menu_service")[0].onmouseover = function() {
        addClass(this, "active");
    }
    getByClass("top_menu_service")[0].onmouseout = function() {
        removeClass(this, "active");
    }



}