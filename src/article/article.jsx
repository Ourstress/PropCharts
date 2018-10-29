import React, { Component } from "react";
import ChartDisplay from "../display/ChartDisplay";
import DataContext from "../dataProcessing/dataContext";

class Article extends Component {
  render() {
    return (
      <article>
        <header>
          <h2>Private Residential Property Prices v HDB Resale Prices</h2>
        </header>
        <ul>
          <li>
            On the whole, HDB Resale prices trend mirror Private Property
            prices.
          </li>
          <li>
            Private Property prices deviate significantly in boom times, notably
            1996 & 2007
          </li>
        </ul>
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
