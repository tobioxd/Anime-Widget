import React from "react";
import AnimeInfor from "./singleanime/AnimeInfor";
import MyComment from "./singleanime/MyComment";
import Comment from "./singleanime/Comment";
import AnimeInforGuest from "./singleanime/AnimeInforGuest";
import MyCommentGuest from "./singleanime/MyCommentGuest";
import AnimePreview from "./singleanime/AnimePreview";

const SingleAnime = () => {
  const curuser = localStorage.getItem("user");

  if (!curuser) return (<div>
    <AnimeInforGuest />
    <AnimePreview />
    <MyCommentGuest />
    <Comment />
  </div>);

  return (
    <div>
      <AnimeInfor />
      <AnimePreview />
      <MyComment />
      <Comment />
    </div>
  );
};

export default SingleAnime;
