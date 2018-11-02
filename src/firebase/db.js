import { db } from "./firebase";
const firebase = require("firebase/app");

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

export const authors = async () => {
  const query = await db.collection("user");
  const container = {};
  await query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const commentsContainer = {};
      commentsContainer.username = doc.data().username;
      commentsContainer.photoURL = doc.data().photoURL;
      container[doc.id] = commentsContainer;
    });
  });
  return container;
};

export const comments = async () => {
  const query = await db.collection("comments");
  const container = {};
  await query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const commentsContainer = {};
      commentsContainer.text = doc.data().text;
      commentsContainer.author = doc.data().author.id;
      container[doc.id] = commentsContainer;
    });
  });
  return container;
};

export const articles = async () => {
  const query = await db.collection("article");
  const container = {};
  const commentsContainer = {};
  await query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      commentsContainer.articleText = doc
        .data()
        .articleText.replace(/-/g, "\n-");
      commentsContainer.graphLeft = doc.data().graphLeft;
      commentsContainer.graphRight = doc.data().graphRight;
      commentsContainer.comments = Object.values(doc.data().comments).map(
        item => item.id
      );
      container[doc.id] = commentsContainer;
    });
  });
  return container;
};

export const queryUserByEmail = async user => {
  const query = await db.collection("user").where("email", "==", user.email);
  return query.get();
};

export const queryUserByEmailOperation = async (querySnapshot, user) => {
  console.log(querySnapshot);
  let result = {};
  let timeNow = new Date();
  if (querySnapshot.size > 0) {
    querySnapshot.forEach(querysnapshot => {
      db.collection("user")
        .doc(querysnapshot.id)
        .update({
          loginSessions: firebase.firestore.FieldValue.arrayUnion(timeNow)
        });
      Object.assign(result, querysnapshot.data());
    });
    return result;
  } else {
    await createUser(
      user.displayName,
      user.email,
      user.photoURL,
      user.phoneNumber
    );
    return {
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
  }
};
