import React from "react";
import styles from "./displayStyles.module.css";

export const GoogleSigninButton = () => {
  return (
    <button className={styles.googleSignIn}>
      <img src={require("../assets/btn_google_light_normal_ios.svg")} />
      Google
    </button>
  );
};
