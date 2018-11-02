import React from "react";

const Comments = props => {
  return (
    <div>
      <p>{props.data.text}</p>
      <p>{props.data.date}</p>
      <p>{props.author.username}</p>
      <img src={props.author.photoURL} alt="commenterProfilePic" width="16" />
    </div>
  );
};

export default Comments;
