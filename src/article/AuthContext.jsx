import React, { Component } from "react";
import { auth } from "../firebase/index";

export const AuthContext = React.createContext(false);

export class AuthContextProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isAuth: false,
      username: "",
      email: "",
      photoURL: ""
    };
  }

  googleLogin = async event => {
    event.preventDefault();
    const results = await auth.signInWithGoogle();
    this.setState(results);
    this.setState({ isAuth: true });
  };

  googleLogOut = event => {
    event.preventDefault();
    auth.signOutGoogle();
    this.setState({
      username: "",
      email: "",
      photoURL: "",
      isAuth: false
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          username: this.state.username,
          email: this.state.email,
          photoURL: this.state.photoURL,
          googleLogin: this.googleLogin,
          googleLogOut: this.googleLogOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
