"use strict";

var bb = require('ciab-backbone');

require('ciab-validation');

module.exports = bb.Model.extend({
  defaults: {
    name: "",
    description: "",
  },

  validation: require('./validation'),
});
