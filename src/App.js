import React, { Component } from "react";
import Article from "./article/article";
import HeaderAndNav from "./display/headerAndNav";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderAndNav />
        <Article />
      </React.Fragment>
    );
  }
}

export default App;
