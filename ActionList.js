"use strict";

var bb = require('ciab-backbone');

var Action = require('./Action');

module.exports = bb.Collection.extend({
  model: Action,
  url: '/actions',
});
