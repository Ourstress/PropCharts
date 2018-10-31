import React from "react";
import styles from "./displayStyles.module.css";

export const GoogleSigninButton = props => {
  return (
    <button className={styles.googleSignIn} onClick={props.onClick}>
      <img src={require("../assets/btn_google_light_normal_ios.svg")} />
      Google
    </button>
  );
};
