import React, { Component } from "react";
import { db } from "../firebase/index";

class AddComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    await db.createComment(
      this.props.userID,
      this.state.value,
      this.props.articleID
    );
    alert("comment submitted!");
    this.setState({ value: "" });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Comment:
          <textarea onChange={this.handleChange} value={this.state.value} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddComments;
