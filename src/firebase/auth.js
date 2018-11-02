//import * as db from "./db";
const firebase = require("firebase/app");
require("firebase/auth");

export const signInWithGoogle = async () => {
  try {
    let provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const signOutGoogle = () => {
  firebase.auth().signOut();
};
