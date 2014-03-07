"use strict";

var React = require('react');
var expect = require('chai').expect;
var sinon = require('sinon');
require('node-jsx').install();

var Action = require('../Action');
var ActionList = require('../ActionList');
var ActionListView = require('../ActionListView');

describe("ActionListView", function() {
  var actionListView, actionList;
  var window, document;

  before(function(done) {
    if (typeof document === 'undefined') {
      var jsdom = require('jsdom');
      jsdom.env({
        html: '<html><body></body></html>',
        done: function (err, window) {
          window = global.window = window;
          document = global.document = window.document;
          var backbone = require('ciab-backbone');
          backbone.$ = backbone.$(window);
          done();
        }
      })
    }
  });

  it("should be createable", function () {

    // create element for action view to bind to
    var actionEl = document.createElement('div');
    actionEl.className = 'actions';
    document.body.appendChild(actionEl);

    // create new action list and reset
    actionList = new ActionList();
    actionList.reset();

    // create new action view
    actionListView = new ActionListView({
      el: actionEl,
      collection: actionList,
    });

    // mount action view
    actionListView.mount();
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
      expect(actionList.add.calledTwice).to.be.true;
      expect(actionListView.getDOMNode().querySelectorAll('form.action-form').length).to.equal(2);
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
