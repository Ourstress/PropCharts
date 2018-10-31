import React, { Component } from "react";
import Article from "./article/article";
import { GoogleSigninButton } from "./display/buttons";
import { db, auth } from "./firebase/index";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      email: ""
    };
  }
  onAuth = event => {
    event.preventDefault();
    auth.signInWithGoogle();
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, email } = this.state;
    db.createUser(username, email);
  };

  render() {
    const byPropKey = (propertyName, value) => () => ({
      [propertyName]: value
    });
    const { username, email } = this.state;
    return (
      <React.Fragment>
        <GoogleSigninButton onClick={this.onAuth} />
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event =>
              this.setState(byPropKey("username", event.target.value))
            }
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
          <button type="submit">Sign Up</button>
        </form>

        <Article />
      </React.Fragment>
    );
  }
}

export default App;
