import React, { Component } from "react";
import ChartDisplay from "../display/ChartDisplay";
import DataContext from "../dataProcessing/dataContext";
import Comments from "./comments";
import AddComments from "./addComments";
import { AuthContext } from "../article/AuthContext";
import { db } from "../firebase/index";
const ReactMarkdown = require("react-markdown");

class Article extends Component {
  async componentDidMount() {
    const articles = await db.articles();
    const comments = await db.comments();
    const authors = await db.authors();
    this.setState({ articles });
    this.setState({ comments });
    this.setState({ authors });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state && <p>loading</p>}
        {this.state &&
          this.state.comments &&
          this.state.authors &&
          Object.keys(this.state.articles).map(key => (
            <article key={key}>
              <ReactMarkdown source={this.state.articles[key].articleText} />
              {this.state.articles[key].comments.map(commentID => (
                <Comments
                  data={this.state.comments[commentID]}
                  author={
                    this.state.authors[this.state.comments[commentID].author]
                  }
                  key={commentID}
                />
              ))}
              <AuthContext.Consumer>
                {({ isAuth }) => isAuth && <AddComments />}
              </AuthContext.Consumer>
              <DataContext>
                <ChartDisplay
                  graphLeft={this.state.articles[key].graphLeft}
                  graphRight={this.state.articles[key].graphRight}
                />
              </DataContext>
            </article>
          ))}
      </React.Fragment>
    );
  }
}

export default Article;
