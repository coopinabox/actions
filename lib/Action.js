"use strict";

var Backbone = require('backbone');

require('ciab-validation');

module.exports = Backbone.Model.extend({
  defaults: {
    name: "",
    description: "",
  },

  validation: require('./validation'),
});
