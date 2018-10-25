import React, { Component } from "react";
import { LineGraph } from "./LineGraph";
import Menu from "./Menu";
import { apiData } from "../dataProcessing/dataContext";

class ChartDisplay extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let name = event.target.name;
    this.setState({
      [name]: this.state == null ? true : !this.state[name]
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.graphs.map(item => (
          <Menu key={item} name={item} handleClick={this.handleClick} />
        ))}
        <apiData.Consumer>
          {data => <LineGraph data={data} {...this.props} {...this.state} />}
        </apiData.Consumer>
      </React.Fragment>
    );
  }
}

export default ChartDisplay;
