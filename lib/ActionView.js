/** @jsx React.DOM */
"use strict";

var Backbone = require('backbone');
var React = require('react');
var ReactBackboneMixin = require('backbone-react-component').mixin;

var validation = require('ciab-validation');

module.exports = React.createClass({
  mixins: [ReactBackboneMixin],
  getInitialState: function () {
    return { errors: {}, saved: true };
  },
  render: function () {
    var model = this.getModel();

    return (
      <section className="action">
        <form role="form">
          <div className="buttons">
            <button className="destroy" onClick={this.destroy} type="button">destroy</button>
            <button className="save" onClick={this.save} type="button">save</button>
          </div>
          <div className={"name-group form-group" + ((this.state.errors.name) ? " has-error" : "") + ((this.state.saved) ? " has-success" : "")}>
            <label htmlFor={"action" + model.id + "name"}>name</label>
            <input value={model.get('name')} name="name" type="text" className="form-control" id={"action" + model.id + "name"} placeholder="empty name" onChange={this.onChange('name')} />
            <span className='help-inline error-message'>{this.state.errors.name}</span>
          </div>
          <div className={"description-group form-group" + ((this.state.errors.description) ? " has-error" : "") + ((this.state.saved) ? " has-success" : "")}>
            <label htmlFor={"action" + model.id + "description"}>description</label>
            <textarea value={model.get('description')} name="description" className="form-control" id={"action" + model.id + "description"} placeholder="empty description" onChange={this.onChange('description')} />
            <span className='help-inline error-message'>{this.state.errors.description}</span>
          </div>
        </form>
      </section>
    );
  },
  destroy: function (event) {
    this.getModel().destroy();
  },
  save: function (event) {
    var self = this;
    this.getModel().save(null, {
      success: function () {
        self.setState.call(self, { saved: true });
      },
      error: function () {
        console.error("save error");
      },
    });
  },
  onChange: function(attr) {
    return function () {
      // set model with changed attributes
      this.getModel().set(attr, event.target.value);

      // update errors with any new error
      var errors = this.state.errors;
      var newError = this.getModel().preValidate(attr, event.target.value);
      errors[attr] = newError || undefined;

      // set new state as unsaved and with any errors
      this.setState({
        saved: false,
        errors: errors
      });
    }.bind(this);
  },
  componentWillMount: function (rootEl) {
    // bind view to collection
    validation.bind(this, {
      model: this.getModel(),
    });
  },
});
