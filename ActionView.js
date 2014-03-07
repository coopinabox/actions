/** @jsx React.DOM */
"use strict";

var bb = require('ciab-backbone');

var validation = require('ciab-validation');

module.exports = bb.React.Component.extend({
  getInitialState: function () {
    return { errors: {}, saved: true };
  },
  render: function () {
    return (
      <section>
        <form role="form" className="task-form">
          <div className="buttons">
            <button className="destroy" onClick={this.destroy} type="button">destroy</button>
            <button className="save" onClick={this.save} type="button">save</button>
          </div>
          <div className={"name-group form-group" + ((this.state.errors.name) ? " has-error" : "") + ((this.state.saved) ? " has-success" : "")}>
            <label htmlFor={"task" + this.model.id + "name"}>name</label>
            <input value={this.model.get('name')} name="name" type="text" className="form-control" id={"task" + this.model.id + "name"} placeholder="empty name" onChange={this.onChange('name')} />
            <span className='help-inline error-message'>{this.state.errors.name}</span>
          </div>
          <div className={"description-group form-group" + ((this.state.errors.description) ? " has-error" : "") + ((this.state.saved) ? " has-success" : "")}>
            <label htmlFor={"task" + this.model.id + "description"}>description</label>
            <textarea value={this.model.get('description')} name="description" className="form-control" id={"task" + this.model.id + "description"} placeholder="empty description" onChange={this.onChange('description')} />
            <span className='help-inline error-message'>{this.state.errors.description}</span>
          </div>
        </form>
      </section>
    );
  },
  destroy: function (event) {
    this.model.destroy();
  },
  save: function (event) {
    var self = this;
    this.model.save(null, {
      success: function () {
        self.setState.call(self, { saved: true });
      },
      error: function () {
        console.error("save error");
      },
    });
  },
  onChange: function(prop) {
    var self = this;
    return function () {
      self.model.set(prop, event.target.value);
      self.setState.call(self, { saved: false });
    };
  },
  componentWillMount: function (rootEl) {
    // bind view to collection
    validation.bind(this, {
      model: this.model,
    });
  },
});
