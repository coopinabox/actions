"use strict";

var Backbone = require('backbone');

var Action = require('./Action');

module.exports = Backbone.Collection.extend({
  model: Action,
  url: '/actions',
});
