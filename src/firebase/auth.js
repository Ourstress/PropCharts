import * as db from "./db";
const firebase = require("firebase");

export const signInWithGoogle = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  const user = result.user;
  const dataWanted = [
    user.displayName,
    user.email,
    user.photoURL,
    user.phoneNumber
  ];
  await db.createUser(...dataWanted);
  return {
    username: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  };
};

export const signOutGoogle = () => {
  firebase.auth().signOut();
};
