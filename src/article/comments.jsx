import React from "react";

const Comments = props => {
  return (
    <div>
      <p>{props.data.text}</p>
      <img src={props.author.photoURL} alt="commenterProfilePic" width="16" />
      <p>{props.author.username}</p>
      <p>{props.data.date}</p>
    </div>
  );
};

export default Comments;
