"use strict";

var bb = require('ciab-backbone');

require('ciab-validation');

module.exports = bb.Model.extend({
  defaults: {
    name: "",
    description: "",
  },

  initialize: function () {
    this.on('change', function () {
      this.validate();
    }.bind(this));
  },

  validation: require('./validation'),
});
