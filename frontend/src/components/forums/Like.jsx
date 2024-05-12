/* eslint-disable react/prop-types */
import React,{useEffect} from "react";

const Like = ({ isLike, reaction, post,isDislike }) => {
  const postid = post._id;

  useEffect(() => {
    }, [reaction]);


  const handleUnLikeButton = () => {
    const reactionid = reaction[0]._id;
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reactions/${reactionid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };

  const handleLikeButton = () => {
    if(isDislike===true){
        const reactionid = reaction[0]._id;
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reactions/${reactionid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                reaction: "like",
              }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              window.location.reload();
            });   
    }else{
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/reactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              post: postid,
              reaction: "like",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              window.location.reload();
            });
    }
  };

  //console.log(isLike);

  if (isLike === true) {
    return (
      <div>
        <span
          className="text-green-500 font-bold cursor-pointer"
          onClick={handleUnLikeButton}
        >
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              className="text-blue-600"
            >
              <path
                fill="currentColor"
                className="group-hover:text-blue-400"
                d="m17.71 11.29l-5-5a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-5 5a1 1 0 0 0 1.42 1.42L11 9.41V17a1 1 0 0 0 2 0V9.41l3.29 3.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
              ></path>
            </svg>
          </div>
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span
          className="text-green-500 font-bold cursor-pointer"
          onClick={handleLikeButton}
        >
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              className="text-blue-400"
            >
              <path
                fill="currentColor"
                className="group-hover:text-blue-600"
                d="m17.71 11.29l-5-5a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-5 5a1 1 0 0 0 1.42 1.42L11 9.41V17a1 1 0 0 0 2 0V9.41l3.29 3.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
              ></path>
            </svg>
          </div>
        </span>
      </div>
    );
  }
};

export default Like;
