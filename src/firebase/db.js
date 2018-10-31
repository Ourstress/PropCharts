import { db } from "./firebase";

export const createUser = (username, email) => {
  db.collection("users")
    .add({
      username,
      email
    })
    .then(function() {
      console.log("Synchronization succeeded");
    });
  console.log("done");
};
