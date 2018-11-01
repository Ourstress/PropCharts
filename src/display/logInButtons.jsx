import React from "react";
import styles from "./logInButtons.module.css";

export const GoogleSigninButton = props => {
  return (
    <button className={styles.googleSignIn} onClick={props.onClick}>
      <img
        src={require("../assets/btn_google_light_normal_ios.svg")}
        alt="google Icon"
      />
      Google
    </button>
  );
};
