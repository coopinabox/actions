/** @jsx React.DOM */
"use strict";

var Backbone = require('ciab-backbone');
var React = require('react');

var ActionList = require('./ActionList');
var ActionView = require('./ActionView');

module.exports = Backbone.React.Component.extend({
  render: function() {

    console.log("render", this.props.collection);

    var actionViews = this.getCollection().models.map(function (action) {
      return new ActionView({ model: action });
    });

    return (
      <section className="actions">
        <header>
          <h2>actions</h2>
          <button className="add" onClick={this.add} type="button">add</button>
        </header>
        { actionViews }
      </section>
    );
  },
  add: function (event) {
    var action = this.getCollection().add({});
    console.log("add", action.toJSON());
  },
});
