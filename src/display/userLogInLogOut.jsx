import React, { Component } from "react";
import { GoogleSigninButton } from "./logInButtons";
import styles from "./nav.module.css";
import { AuthContext } from "../article/AuthContext";

class UserLogInLogOut extends Component {
  render() {
    return (
      <React.Fragment>
        <AuthContext.Consumer>
          {({ isAuth, googleLogin, googleLogOut, username, photoURL }) =>
            isAuth === false ? (
              <header>
                <h1>PropCharts</h1>
                <section>
                  <p className={`${styles.logInLogOutp} ${styles.logInLogOut}`}>
                    Login:
                  </p>
                  <GoogleSigninButton
                    onClick={googleLogin}
                    className={styles.logInLogOut}
                  />
                </section>
              </header>
            ) : (
              <section>
                <p>Hello {username}</p>
                <img src={photoURL} width="16" alt="profile pic" />
                <button onClick={googleLogOut}>logout</button>
              </section>
            )
          }
        </AuthContext.Consumer>
      </React.Fragment>
    );
  }
}

export default UserLogInLogOut;
