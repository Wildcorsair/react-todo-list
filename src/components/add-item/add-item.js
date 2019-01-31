import React, { Component } from 'react';

export default class AddItem extends Component {

  constructor() {
    super();

    this.state = {
      label: ''
    };
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value
    });
  }

  onItemSubmit(e) {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  }

  render() {
    return (
      <form
        className="item-add-form d-flex"
        onSubmit={this.onItemSubmit.bind(this)}>
        <input
          className="form-control"
          type="text"
          onChange={this.onLabelChange.bind(this)}
          value={this.state.label}
          placeholder="What needs to be done?" />
        <button
          className="btn btn-outline-secondary">
          Add
        </button>
      </form>
    );
  }

}
