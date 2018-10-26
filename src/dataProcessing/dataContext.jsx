import React, { Component } from "react";
import * as data from "./dataApi";

export const apiData = React.createContext();

class DataContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const getData = async name => {
      const apiResult = await data[name];
      this.setState({ [name]: apiResult });
    };
    try {
      await getData("PRPI");
      await getData("HDBRPI");
      await getData("siborMAS");
      await getData("STI");
      this.setState({
        STI_siborMAS: await data.concatArray(
          this.state.siborMAS,
          this.state.STI
        )
      });
      this.setState({
        PRPI_STI_siborMAS: await data.concatArray(
          this.state.STI_siborMAS,
          this.state.PRPI
        )
      });
      this.setState({
        all: await data.concatArray(
          this.state.PRPI_STI_siborMAS,
          this.state.HDBRPI
        )
      });
      this.setState({ data: this.state.all });
    } catch (error) {
      throw error;
    }
  }

  render() {
    const data = this.state.data;
    return (
      <apiData.Provider value={data}>{this.props.children}</apiData.Provider>
    );
  }
}

export default DataContext;
