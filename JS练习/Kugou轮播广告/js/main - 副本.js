  Array.prototype.contains = function(obj) {
      var i = this.length;
      while (i--) {
          if (this[i] === obj) {
              return true;
          }
      }
      return false;
  }

  function Iteration(array, index) {
      if (!(this instanceof Iteration)) return new Iteration(array, index);
      switch (Object.prototype.toString.call(array)) {
          case "[object Array]":
              this.array = array;
              break;
          case "[object Number]":
              this.array = (function(len) {
                  var result = [],
                      index = 0;
                  (function() {
                      if (index > len - 1) return;
                      result.push(index);
                      index++;
                      arguments.callee();
                  })();
                  return result;
              })(array);
              break;
          default:
              this.array = [];
              break;
      }
      this.maxIndex = this.array.length > 1 ? this.array.length - 1 : 0;
      this.curIndex = index || 0;
      this.curIndex = Math.min(Math.max(0, this.curIndex), this.maxIndex);
  }
  Iteration.prototype.prev = function() {
      var prev = this.curIndex - 1;
      if (prev < 0) prev = this.maxIndex;
      this.curIndex = prev;
      return this.value();
  };
  Iteration.prototype.next = function() {
      var next = this.curIndex + 1;
      if (next > this.maxIndex) next = 0;
      this.curIndex = next;
      return this.value();
  };
  Iteration.prototype.go = function(index) {
      this.curIndex = Math.min(Math.max(0, index), this.maxIndex);
      return this;
  };
  Iteration.prototype.value = function() {
      return this.array[this.curIndex];
  };

  function IterationGroup() {
      if (!(this instanceof IterationGroup)) return new IterationGroup();
      this.iterations = [];
  }
  IterationGroup.prototype.add = function(iteration) {
      if (iteration instanceof Iteration) this.iterations.push(iteration);
      return this;
  };
  IterationGroup.prototype.next = function() {
      for (var i = 0; i < this.iterations.length; i++)
          this.iterations[i].next();
      return this;
  };
  IterationGroup.prototype.prev = function() {
      for (var i = 0; i < this.iterations.length; i++)
          this.iterations[i].prev();
      return this;
  };
  IterationGroup.prototype.value = function() {
      var result = [];
      for (var i = 0; i < this.iterations.length; i++)
          result.push(this.iterations[i].value());
      return result;
  };


  window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame || function(fn) {
          setTimeout(fn, 1000 / 60);
      };



  window.onload = function() {

      //得意的笑

      function getParams(steps, pos, center_height, s_height) {
          var _from, _to, result = [];
          for (var i = 0; i < steps.length; i++) {
              _from = steps[i].split("->")[0];
              _to = steps[i].split("->")[1];
              //从back移到两边只变化left
              if (!/center/.test(steps[i])) {
                  result.push({
                      "left": {
                          "begin": pos[_from].offsetLeft,
                          "change": pos[_to].offsetLeft - pos[_from].offsetLeft
                      }
                  });
                  continue;
              }
              //从两边移到中间
              var parms = {};
              var changeAttr = ["Left", "Width", "Height"];
              for (var at = 0; at < changeAttr.length; at++) {
                  parms[changeAttr[at].toLowerCase()] = {
                      "begin": pos[_from]["offset" + changeAttr[at]],
                      "change": pos[_to]["offset" + changeAttr[at]] - pos[_from]["offset" + changeAttr[at]]
                  };
              }
              parms["top"] = {
                  "begin": pos[_from].offsetTop,
                  "change": _from == "center" ? (center_height - s_height) / 2 : -(center_height - s_height) / 2
              };
              parms["_opacity"] = {};
              result.push(parms);
          }
          return result;
      }

      function AnimationParams() {
          var rightSteps = "right->back center->right left->center back->left".split(' ');
          var leftSteps = "left->back center->left right->center back->right".split(' ');
          var pos = {
              "left": Sizzle(".item_con .left")[0],
              "center": Sizzle(".item_con .center")[0],
              "right": Sizzle(".item_con .right")[0],
              "back": Sizzle(".item_con .back")[0]
          };

          var s_height = pos["left"].offsetHeight;
          var center_height = pos["center"].offsetHeight;

          return {
              "rightSteps": {
                  "steps": rightSteps,
                  "params": getParams(rightSteps, pos, center_height, s_height)
              },
              "leftSteps": {
                  "steps": leftSteps,
                  "params": getParams(leftSteps, pos, center_height, s_height)
              }
          }

      }

      function init() {
          var iterationGroup = IterationGroup();
          iterationGroup.add(Iteration(16, 15));
          iterationGroup.add(Iteration(16, 0));
          iterationGroup.add(Iteration(16, 1));

          var values = iterationGroup.next().value();
          var leftIndex = values[0];
          var centerIndex = values[1];
          var rightIndex = values[2];

          var con = Sizzle(".item_con")[0];
          var result = "",
              cls = "";
          for (var i = 1; i <= 16; i++) {
              result += document.getElementById("tpl").innerHTML.replace(/{(\w+)}/g, function(match, $1) { return { class: values.contains(i - 1) ? "" : "back", "name": i }[$1]; });
          }
          con.innerHTML = result;


          var items = Sizzle(".item_con .item");
          items[leftIndex].classList.add('left');
          items[centerIndex].classList.add('center');
          items[rightIndex].classList.add('right');

      }

      init();
      /*var left = Sizzle(".item_con .left")[0];
      var right = Sizzle(".item_con .right")[0];
      var center = Sizzle(".item_con .center")[0];
      var mask = Sizzle(".item_con .center .mask")[0];

      var back = Sizzle(".item_con .back")[0];
        var s_width = left.offsetWidth;
        var s_height = left.offsetHeight;
        var s_left_left = left.offsetLeft;
        var s_left_top = left.offsetTop;

        var center_width = center.offsetWidth;
        var center_height = center.offsetHeight;
        var center_left = center.offsetLeft;
        var center_top = center.offsetTop;

        var s_right_left = right.offsetLeft;
        var s_bg_left = back.offsetLeft;

        var top_offset = -(center_height - s_height) / 2;
        */
      var start = null;
      var totalSteps = 15;
      var stepCount = 1;
      var params = AnimationParams()["leftSteps"];
      var moveElements = {
          "left": Sizzle(".item_con .left")[0],
          "center": Sizzle(".item_con .center")[0],
          "right": Sizzle(".item_con .right")[0],
          "back": Sizzle(".item_con .back")[0]
      }

      function Run(timestamp) {

          for (var i = 0; i < params["steps"].length; i++) {
              var _from = params["steps"][i].split("->")[0];
              var _to = params["steps"][i].split("->")[1];
              var _params = params["params"][i];
              for (var attr in _params) {
                  moveElements[_from].style[attr] = Tween["Linear"](stepCount, _params[attr]["begin"], _params[attr]["change"], totalSteps) + "px";
                  if (attr == "_opacity") {
                      if (_to == "center") {
                          Sizzle(".item_con .right .mask")[0].style.opacity = 0.5 - 0.5 * stepCount / totalSteps;
                      } else if (_to == "left" || _to == "right") {
                          Sizzle(".item_con .center .mask")[0].style.opacity = 0.5 * stepCount / totalSteps;
                      }
                  }
              }
          }

          /*
          right.style.left = Tween["Linear"](stepCount, s_right_left, s_bg_left - s_right_left, totalSteps) + "px";

          left.style.top = Tween["Linear"](stepCount, s_left_top, top_offset, totalSteps) + "px";
          left.style.left = Tween["Linear"](stepCount, s_left_left, center_left - s_left_left, totalSteps) + "px";
          left.style.width = Tween["Linear"](stepCount, s_width, center_width - s_width, totalSteps) + "px";
          left.style.height = Tween["Linear"](stepCount, s_height, center_height - s_height, totalSteps) + "px";
          Sizzle(".item_con .left .mask")[0].style.opacity = 0.5 - 0.5 * stepCount / totalSteps;


          center.style.top = Tween["Linear"](stepCount, center_top, -top_offset, totalSteps) + "px";
          center.style.left = Tween["Linear"](stepCount, center_left, s_right_left - center_left, totalSteps) + "px";
          center.style.width = Tween["Linear"](stepCount, center_width, s_width - center_width, totalSteps) + "px";
          center.style.height = Tween["Linear"](stepCount, center_height, s_height - center_height, totalSteps) + "px";
          mask.style.opacity = 0.5 * stepCount / totalSteps;

          back.style.left = Tween["Linear"](stepCount, s_bg_left, s_left_left - s_bg_left, totalSteps) + "px";
          */
          if (stepCount < totalSteps) {
              requestAnimationFrame(Run);
          }
          stepCount++;
      }
      //requestAnimationFrame(Run);

  }