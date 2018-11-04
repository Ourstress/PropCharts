import { db } from "./firebase";
const firebase = require("firebase/app");

export const createComment = (authorID, text, articleID) => {
  let timeNow = new Date();
  db.collection("comments")
    .add({
      author: firebase.firestore().doc(`/user/${authorID}`),
      date: timeNow,
      text: text
    })
    .then(doc => {
      const newCommentID = doc.id;
      db.collection("article")
        .doc(articleID)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(
            firebase.firestore().doc(`/comments/${newCommentID}`)
          )
        });
    });
};
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
      commentsContainer.date = doc
        .data()
        .date.toDate()
        .toLocaleString()
        .toString();
      commentsContainer.author = doc.data().author.id;
      container[doc.id] = commentsContainer;
    });
  });
  return container;
};

export const articles = async () => {
  const query = await db.collection("article");
  const container = {};
  await query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const commentsContainer = {};
      commentsContainer.articleText = doc
        .data()
        .articleText.replace(/-/g, "\n-")
        .replace(/###/g, "\n\n");
      commentsContainer.graphLeft = doc.data().graphLeft;
      commentsContainer.graphRight = doc.data().graphRight;
      commentsContainer.dateUpdated = doc.data().dateUpdated;
      commentsContainer.pubdate = doc.data().pubdate;
      commentsContainer.author = doc.data().author.id;
      commentsContainer.title = doc.data().title;
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
  let result = {};
  let timeNow = new Date();
  if (querySnapshot.size > 0) {
    querySnapshot.forEach(Snapshot => {
      db.collection("user")
        .doc(Snapshot.id)
        .update({
          loginSessions: firebase.firestore.FieldValue.arrayUnion(timeNow)
        });
      Object.assign(result, Snapshot.data());
      Object.assign(result, { userID: Snapshot.id });
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
