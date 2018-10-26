import React, { Component } from "react";
import { urlName } from "../dataProcessing/dataApi";

class Menu extends Component {
  render() {
    return (
      <div>
        <label htmlFor="item"> {urlName[this.props.name]} </label>
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.handleClick}
          name={this.props.name}
        />
      </div>
    );
  }
}

export default Menu;
