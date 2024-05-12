import React, { useEffect, useState } from "react";
import PostUser from "./PostUser";
import PostGuest from "./PostGuest";
import Comment from "./Comment";
import NewCommentUser from "./NewCommentUser";
import NewCommentGuest from "./NewCommentGuest";
import { useParams } from "react-router-dom";

export const Post = () => {
  const curuser = localStorage.getItem("user");
  const { id } = useParams();
  const [curpost, setPost] = useState(null);
  const [reaction, setReaction] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    if(curuser){
      const curuserId = JSON.parse(curuser)._id;
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/reactions/${curuserId}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setReaction(data);
        });
    }

    fetchPost();
  }, [id]);

  if (!curpost) {
    return <div>Loading...</div>;
  }

  if (curuser) {

    return (
      <div className="mt-40 mb-10 w-3/4 mx-auto">
        <PostUser post={curpost} reaction={reaction}/>
        <NewCommentUser />
        <Comment />
      </div>
    );
  } else {
    return (
      <div className="mt-40 mb-10 w-3/4 mx-auto">
        <PostGuest post={curpost} />
        <NewCommentGuest />
        <Comment />
      </div>
    );
  }
};

export default Post;
