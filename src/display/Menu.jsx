import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div>
        <label htmlFor="item">{this.props.name} </label>
        <input
          type="checkbox"
          defaultChecked={this.props.defaultChecked}
          onChange={this.props.handleClick}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Menu;
