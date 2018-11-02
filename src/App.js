import React, { Component } from "react";
import Article from "./article/article";
import HeaderAndNav from "./display/headerAndNav";
import { AuthContextProvider } from "./article/AuthContext";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AuthContextProvider>
          <HeaderAndNav />
          <Article />
        </AuthContextProvider>
      </React.Fragment>
    );
  }
}

export default App;
