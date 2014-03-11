"use strict";

var Backbone = require('backbone');
var React = require('react');

module.exports = Backbone.Router.extend({
  routes: {
    "actions": "all",
  },
  all: function () {
    var ActionList = require('./ActionList');
    var actionList = new ActionList();
    var ActionListView = require('./ActionListView');
    var actionListView = new ActionListView({
      collection: actionList,
    });
    actionList.fetch({
      success: function () {
        React.renderComponent(
          actionListView,
          document.querySelector('main')
        );
      },
      error: function () {
        console.error("error fetching actions!")
      },
    });
  },
});
    
