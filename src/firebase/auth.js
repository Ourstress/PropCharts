import { auth } from "./firebase";
import * as db from "./db";

export const signInWithGoogle = async () => {
  let provider = new auth.GoogleAuthProvider();
  auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user; // ...
      console.log(user);
      db.createUser(user.displayName, user.email);
    });
};
