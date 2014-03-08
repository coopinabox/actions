"use strict";

var bb = require('ciab-backbone');

module.exports = bb.Router.extend({
  routes: {
    "actions": "all",
  },
  all: function () {
    var ActionList = require('./ActionList');
    var actionList = new ActionList();
    var ActionListView = require('./ActionListView');
    var actionListView = new ActionListView({
      el: document.querySelector('main'),
      collection: actionList,
    });
    actionList.fetch({
      success: function () {
        actionListView.mount();
      },
      error: function () {
        console.error("error fetching actions!")
      },
    });
  },
});
    
