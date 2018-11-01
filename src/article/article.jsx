import React, { Component } from "react";
import ChartDisplay from "../display/ChartDisplay";
import DataContext from "../dataProcessing/dataContext";
const ReactMarkdown = require("react-markdown");

class Article extends Component {
  render() {
    const input =
      "# Private Residential Property Prices v HDB Resale Prices\n* On the whole, HDB Resale prices trend mirror Private Property prices. \n* Private Property prices deviate significantly in boom times, notably 1996 & 2007";
    return (
      <article>
        <ReactMarkdown source={input} />
        <DataContext>
          <ChartDisplay
            graphLeft={["PRPI", "HDBRPI"]}
            graphRight={["siborMAS", "STI"]}
          />
        </DataContext>
      </article>
    );
  }
}

export default Article;
