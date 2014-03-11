"use strict";

var React = require('react');
var expect = require('chai').expect;
var sinon = require('sinon');

var Action = require('../lib/Action');
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

    // renderComponent action view
    React.renderComponent(
      actionListView,
      document.body
    );
  });

  describe('clicking the plus button twice', function() {

    before(function() {

      // create a new initialize function for action model
      // that will allow us to spy on .save()
      var init = Action.prototype.initialize;
      Action.prototype.initialize = function () {
        sinon.spy(this, 'save');
        init.apply(this, arguments);
      };

      sinon.spy(actionList, 'add');
      actionListView.getDOMNode().querySelector('button.add').click();
      actionListView.getDOMNode().querySelector('button.add').click();
    });

    it("should create two empty actions", function() {
      console.log(actionListView.getDOMNode().querySelectorAll('section.action'));
      expect(actionList.add.calledTwice).to.be.true;
      expect(actionListView.getDOMNode().querySelectorAll('section.action').length).to.equal(2);
      expect(actionList.models.length).to.equal(2);
    });

    it("should not save the actions to the server", function() {
      expect(actionList.models[0].save.called).to.be.false;
      expect(actionList.models[1].save.called).to.be.false;
    });
    
    /*
    describe("editing the action", function() {
      beforeEach(function() {

      });

      it("should save the Action to the server", function() {

      });
    });
    */
  });
});
