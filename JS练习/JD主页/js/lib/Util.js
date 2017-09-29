define(function() {
    var _id = 0;

    function random(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getElementsByClassName(searchClass, node, tag) {
        if (document.getElementsByClassName) {
            return (node || document).getElementsByClassName(searchClass)
        } else {
            node = node || document;
            tag = tag || '*';
            var returnElements = [];
            var els = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag);
            var i = els.length;
            searchClass = searchClass.replace(/\-/g, "\\-");
            var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
            while (--i >= 0) {
                if (pattern.test(els[i].className)) {
                    returnElements.unshift(els[i]);
                }
            }
            return returnElements;
        }
    }

    function inherit(child, parent) {
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.parent = parent;
    }

    function deepCopy(p, c) {　　　　
        var c = c || {};　　　　
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
                deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }

    function toggleClass(obj, cls) {
        if (hasClass(obj, cls)) {
            removeClass(obj, cls);
        } else {
            addClass(obj, cls);
        }
    }

    return {
        "random": random,
        "inherit": inherit,
        "deepCopy": deepCopy,
        "hasClass":hasClass,
        "addClass":addClass,
        "removeClass":removeClass,
        "toggleClass":toggleClass,
        "newId": function(pre) {
            return (pre || "util") + _id++;
        },
        "$$": function(id) {
            return document.getElementById(id);
        },
        "$": getElementsByClassName
    }
});