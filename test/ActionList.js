"use strict";

var expect = require('chai').expect;

var ActionList = require('../ActionList');

describe("ActionList", function () {
  var actionList = new ActionList();

  describe(".create", function () {
    beforeEach(function () {
      actionList.reset();
    });
    it("should have correct defaults", function () {
      var action = actionList.add({});
      expect(action.get('name'))
        .to.be.a('string')
        .and.to.equal('');
      expect(action.get('description'))
        .to.be.a('string')
        .and.to.equal('');
    });
    it("should not allow invalid data", function () {
      var action = actionList.create({
        "name": "areallylongnamethatissolong",
        "description": "",
      });
      var error = action.validationError;
      expect(error).to.exist;
      expect(error.name).to.equal("Name must be at most 10 characters");
    });
  });
});

