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


  function KuGouBanner() {
      if (!(this instanceof KuGouBanner)) return new KuGouBanner();
      this.con = Sizzle(".item_con")[0];
      this.iterationGroup = null;
      this.requestAnimationFrame = null;
      this.items = null;
      this.animationParams = null;
      this.timer = null;
  }
  KuGouBanner.prototype.init = function() {
      var iterationGroup = this.iterationGroup = IterationGroup();
      iterationGroup.add(Iteration(16, 15));
      iterationGroup.add(Iteration(16, 0));
      iterationGroup.add(Iteration(16, 1));
      var values = this.iterationGroup.value();

      var result = "";
      for (var i = 1; i <= 16; i++) {
          result += document.getElementById("tpl").innerHTML.replace(/{(\w+)}/g, function(match, $1) {
              return { class: values.contains(i - 1) ? "" : "back", "name": i }[$1];
          });
      }
      this.con.innerHTML = result;
      this.items = Sizzle(".item_con .item");

      for (var i = 1; i <= 16; i++) {
          Sizzle(".wrap .lines")[0].appendChild(document.createElement("li"));
      }
      Sizzle(".wrap .lines li")[0].className = "active";
      this.updateBanner();
      this.initRequestAnimationFrame();
      this.initEvent();

      return this;
  }
  KuGouBanner.prototype.initEvent = function() {

      Sizzle(".wrap .pre")[0].onclick = function() {
          this.next();
      }.bind(this);
      Sizzle(".wrap .next")[0].onclick = function() {
          this.prev();
      }.bind(this);

      Sizzle(".wrap")[0].onmouseover = function(event) {
          Sizzle(".wrap .pre")[0].style.display = 'block';
          Sizzle(".wrap .next")[0].style.display = 'block';
          this.stopPlay();
      }.bind(this)
      Sizzle(".wrap")[0].onmouseout = function(event) {
          Sizzle(".wrap .pre")[0].style.display = 'none';
          Sizzle(".wrap .next")[0].style.display = 'none';
          this.autoPlay();
      }.bind(this)

      //窗口失去焦点后 定时器会减缓
      window.onfocus = function() {
          this.autoPlay();
      }.bind(this);

      window.onblur = function() {
          this.stopPlay();
      }.bind(this);

  }
  KuGouBanner.prototype.autoPlay = function() {
      clearInterval(this.timer);
      var self = this;
      this.timer = setInterval(function() {
          self.prev();
      }, 2000);
  }
  KuGouBanner.prototype.stopPlay = function() {
      clearInterval(this.timer);
  }
  KuGouBanner.prototype.updateBanner = function() {
      var values = this.iterationGroup.value();
      var items = this.items;
      for (var i = 0; i < items.length; i++) {
          items[i].index = i;
          items[i].className = "item" + (values.contains(i) ? "" : " back");
      }
      items[values[0]].classList.add('left');
      items[values[1]].classList.add('center');
      items[values[2]].classList.add('right');
  }

  //从右到左
  KuGouBanner.prototype.prev = function() {
      //this.iterationGroup.prev();
      // this.updateBanner();
      this.startAnimation("prev");
      return this;
  }
  //从左到右
  KuGouBanner.prototype.next = function() {
      //this.iterationGroup.next();
      //this.updateBanner();
      this.startAnimation("next");
      return this;
  }
  KuGouBanner.prototype.animationComplete = function(direction) {
      if (direction == "next") {
          //从左到右 索引减1
          this.iterationGroup.prev();
      } else {
          this.iterationGroup.next();
      }
      var index = this.iterationGroup.value()[1];
      Sizzle(".wrap .lines .active")[0].classList.remove("active");
      Sizzle(".wrap .lines li")[index].className = "active";
  }
  KuGouBanner.prototype.startAnimation = function(direction) {
      var totalSteps = 20,
          stepCount = 1;
      var items = this.items;
      if (this.animationParams == null)
          this.animationParams = this.AnimationParams();

      var params = this.animationParams[direction == "next" ? "rightSteps" : "leftSteps"];
      var values = this.iterationGroup.value();
      var backItem = null;
      if (direction == "next") {
          //从左到右 左边索引减1
          backItem = items[Iteration(16, values[0]).prev()];
      } else {
          //从右到左 右边索引加1
          backItem = items[Iteration(16, values[2]).next()];
      }
      var moveElements = {
          "back": backItem,
          "left": items[values[0]],
          "center": items[values[1]],
          "right": items[values[2]],

      }

      if (direction == "next") {
          moveElements["left"].style.zIndex = 6;
          moveElements["center"].style.zIndex = 4;
          moveElements["right"].style.zIndex = 2;
          moveElements["back"].style.zIndex = 1;
      } else {
          moveElements["left"].style.zIndex = 2;
          moveElements["center"].style.zIndex = 4;
          moveElements["right"].style.zIndex = 6;
          moveElements["back"].style.zIndex = 1;
      }
      var self = this;

      function Run(timestamp) {

          for (var i = 0; i < params["steps"].length; i++) {
              var _from = params["steps"][i].split("->")[0];
              var _to = params["steps"][i].split("->")[1];
              var _params = params["params"][i];
              for (var attr in _params) {
                  moveElements[_from].style[attr] = Tween["Cubic"]["easeOut"](stepCount, _params[attr]["begin"], _params[attr]["change"], totalSteps) + "px";
                  if (attr == "_opacity") {
                      if (_to == "center") {
                          //逐渐清晰
                          moveElements[_from].getElementsByClassName("mask")[0].style.opacity = 0.6 - 0.6 * stepCount / totalSteps;
                          moveElements[_from].getElementsByClassName("mask")[0].style.filter = "filter: alpha(opacity=" + (0.6 - 0.6 * stepCount / totalSteps) * 100 + ")";

                      } else if (_to == "left" || _to == "right") {
                          //逐渐暗淡
                          moveElements[_from].getElementsByClassName("mask")[0].style.opacity = 0.6 * stepCount / totalSteps;
                          moveElements[_from].getElementsByClassName("mask")[0].style.filter = "filter: alpha(opacity=" + (0.6 * stepCount / totalSteps) * 100 + ")";
                      }
                  }
              }
          }
          //动画完成
          if (stepCount == totalSteps) {
              self.animationComplete(direction);
          }

          if (stepCount < totalSteps) {
              requestAnimationFrame(Run);
          }
          stepCount++;
      }
      requestAnimationFrame(Run);
  }
  KuGouBanner.prototype.getParams = function(steps, pos, center_height, s_height) {
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
  };

  KuGouBanner.prototype.AnimationParams = function() {
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
              "params": this.getParams(rightSteps, pos, center_height, s_height)
          },
          "leftSteps": {
              "steps": leftSteps,
              "params": this.getParams(leftSteps, pos, center_height, s_height)
          }
      }
  }

  KuGouBanner.prototype.initRequestAnimationFrame = function() {
      window.requestAnimationFrame = window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame || function(fn) {
              setTimeout(fn, 1000 / 60);
          };
  }



  window.onload = function() {

      //得意的笑
      window.KuGouBanner = KuGouBanner().init().autoPlay();


  }