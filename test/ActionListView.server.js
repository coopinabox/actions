"use strict";

var React = require('react');
var expect = require('chai').expect;
require('node-jsx').install();

var ActionList = require('../lib/ActionList');
var ActionListView = require('../lib/ActionListView');

describe("ActionListView", function() {
  var actionListView, actionList;

  it("should be createable", function () {

    // create new action list
    actionList = new ActionList();

    // create new action view
    actionListView = new ActionListView({
      collection: actionList,
    });
  });

  it("should be renderable", function () {
    // render action view
    var html = React.renderComponentToString(
      actionListView
    );
    expect(html).to.exist;
  });
});