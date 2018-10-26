import React, { Component } from "react";
import { LineGraph } from "./LineGraph";
import Menu from "./Menu";
import { apiData } from "../dataProcessing/dataContext";

class ChartDisplay extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  handleClickLeft(event) {
    let name = event.target.name;
    this.setState({
      [name]:
        this.state == null || this.state[name] == null
          ? false
          : !this.state[name]
    });
  }

  handleClickRight(event) {
    let name = event.target.name;
    this.setState({
      right:
        this.state == null || this.state.right !== `right${name}`
          ? "right" + [name]
          : null
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.graphLeft.map(item => (
          <Menu
            key={item}
            name={item}
            handleClick={this.handleClickLeft}
            checked={
              this.state == null || this.state[item] == null
                ? true
                : this.state[item]
            }
          />
        ))}
        {this.props.graphRight.map(item => (
          <Menu
            key={item}
            name={item}
            handleClick={this.handleClickRight}
            checked={
              this.state == null || this.state.right !== `right${item}`
                ? false
                : true
            }
          />
        ))}
        <apiData.Consumer>
          {data => <LineGraph data={data} {...this.props} {...this.state} />}
        </apiData.Consumer>
      </React.Fragment>
    );
  }
}

export default ChartDisplay;
