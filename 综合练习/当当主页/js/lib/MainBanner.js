  var OpacityBanner = require('./OpacityBanner');
  var Util = require('./Util');
  var MainBanner = {
      "autoPlayTimer": null,
      "mainBanner": null,
      "subBanner": null,
      "interval": 2000,
      "init": function() {
          var self = this;
          this.mainBanner = new OpacityBanner({
              "id": "mainBanner",
              "itemClass": "banner",
              "autoPlay": false
          }).on("focusChange", function(event) {
              if (event.msg == "prev") {
                  this.subBanner.prev();
                  return;
              }
              this.subBanner.next();

          }.bind(this));

          this.subBanner = new OpacityBanner({
              "id": "mainSubBanner",
              "itemClass": "banner",
              "autoPlay": false
          }).on("focusChange", function(event) {
              if (event.msg == "prev") {
                  this.mainBanner.prev();
                  return;
              }
              this.mainBanner.next();
          }.bind(this));
          this.initEvent();
          return this;
      },
      "next": function() {
          this.mainBanner.next();
          this.subBanner.next();
      },
      "initEvent": function() {
          var self = this;
          Util.$("nav_center").onmouseover = function() {
              self.stopPlay();
          }
          Util.$("nav_center").onmouseout = function() {
              self.autoPlay();
          }
          return this;
      },
      "stopPlay": function() {
          clearInterval(this.autoPlayTimer);
          return this;
      },
      "autoPlay": function() {
          var self = this;
          this.autoPlayTimer = setInterval(function() {
              self.next();
          }, self.interval);
          return this;
      }
  }
  module.exports = MainBanner;