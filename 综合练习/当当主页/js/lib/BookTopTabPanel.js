 var Tab = require('./Tab');
 var Util = require('./Util');

 function BookTopTabPanel(config) {
     Tab.call(this, config);
     this.books = null;
 }
 Util.inherit(BookTopTabPanel, Tab);
 BookTopTabPanel.prototype.initComplete = function() {
     this.books = Util.$("right_book", this.con);
 }
 BookTopTabPanel.prototype.initEventComplete = function() {
     var self = this;
     var books = this.books;
     for (var i = 0; i < books.length; i++) {
         books[i].index = i;
         books[i].onmouseover = function() {
             var active = Util.$("active", self.getCurrentContent());
             if (active) Util.removeClass(active, "active");
             Util.addClass(books[this.index], "active");
         }
     }
 }
 module.exports = BookTopTabPanel;