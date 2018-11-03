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
      <section role="main">
        {!this.state && <p>loading</p>}
        {this.state &&
          this.state.comments &&
          this.state.authors &&
          Object.keys(this.state.articles).map(key => (
            <article key={key} className="h-entry">
              <section>
                <ReactMarkdown source={this.state.articles[key].articleText} />
              </section>
              <section className="comments">
                {this.state.articles[key].comments.map(commentID => (
                  <Comments
                    className="comment"
                    data={this.state.comments[commentID]}
                    author={
                      this.state.authors[this.state.comments[commentID].author]
                    }
                    key={commentID}
                  />
                ))}
                <AuthContext.Consumer>
                  {({ isAuth, userID }) =>
                    isAuth && <AddComments userID={userID} articleID={key} />
                  }
                </AuthContext.Consumer>
              </section>
              <section>
                <DataContext>
                  <ChartDisplay
                    graphLeft={this.state.articles[key].graphLeft}
                    graphRight={this.state.articles[key].graphRight}
                  />
                </DataContext>
              </section>
            </article>
          ))}
      </section>
    );
  }
}

export default Article;
