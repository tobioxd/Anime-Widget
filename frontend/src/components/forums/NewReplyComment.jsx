/* eslint-disable react/prop-types */
import React from "react";
import NewReplyCommentUser from "./NewReplyCommentUser";
import NewReplyCommentGuest from "./NewReplyCommentGuest";

const NewReplyComment = ({commentId}) => {
  const curuser = localStorage.getItem("user");

  if (curuser) {
    return <NewReplyCommentUser commentId={commentId}/>;
  } else {
    return <NewReplyCommentGuest />;
  }
};

export default NewReplyComment;
