import React, { Component } from "react";
import ChartDisplay from "./display/ChartDisplay";
import DataContext from "./dataProcessing/dataContext";

class App extends Component {
  render() {
    return (
      <DataContext>
        <ChartDisplay graphs={["PRPI", "HDBRPI"]} />
      </DataContext>
    );
  }
}

export default App;
