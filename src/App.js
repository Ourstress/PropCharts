import React, { Component } from "react";
import Article from "./article/article";
import HeaderAndNav from "./display/headerAndNav";
import { AuthContextProvider } from "./article/AuthContext";

class App extends Component {
  render() {
    return (
      <div className="container">
        <AuthContextProvider>
          <HeaderAndNav />
          <Article />
        </AuthContextProvider>
      </div>
    );
  }
}

export default App;
