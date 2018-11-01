import { db } from "./firebase";

export const createUser = (
  username,
  email,
  photoURL = "",
  phoneNumber = ""
) => {
  db.collection("user").add({
    username,
    email,
    photoURL,
    phoneNumber
  });
};
