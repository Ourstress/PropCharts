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
      [name]:
        this.state == null || this.state[name] == null
          ? true
          : !this.state[name]
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
            defaultChecked={true}
          />
        ))}
        {this.props.graphRight.map(item => (
          <Menu
            key={item}
            name={item}
            handleClick={this.handleClickRight}
            defaultChecked={false}
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
