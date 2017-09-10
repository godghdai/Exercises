define(function() {
    var _id = 0;

    function forEach(array, iteratee) {
        for (var i = 0; i < array.length; i++) {
            iteratee(array[i], i, array);
        }
        return array;
    }

    function map(array, iteratee) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            result.push(iteratee(array[i], i, array));
        }
        return result;
    }

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
    return {
        "forEach": forEach,
        "map": map,
        "random": random,
        "inherit": inherit,
        "deepCopy": deepCopy,
        "newId": function(pre) {
            return (pre || "util") + _id++;
        },
        "$$": function(id) {
            return document.getElementById(id);
        },
        "$": getElementsByClassName
    }
});