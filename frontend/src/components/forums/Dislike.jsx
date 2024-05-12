/* eslint-disable react/prop-types */
import React from "react";

const Dislike = ({ isDislike,reaction,post ,isLike}) => {
  const handleDislikeButton = () => {
    if(isLike===true){
        const reactionid = reaction[0]._id;
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reactions/${reactionid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                reaction: "dislike",
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
              post: post._id,
              reaction: "dislike",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              window.location.reload();
            });
    }
  };

  const handleUnDislikeButton = () => {
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

  if (isDislike === true) {
    return (
      <div>
        <span
          className="text-red-500 font-bold cursor-pointer"
          onClick={handleUnDislikeButton}
        >
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                className="text-red-600 group-hover:text-red-400"
                d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42"
              ></path>
            </svg>
          </div>{" "}
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span
          className="text-red-500 font-bold cursor-pointer"
          onClick={handleDislikeButton}
        >
          <div className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                className="text-red-400 group-hover:text-red-600"
                d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42"
              ></path>
            </svg>
          </div>{" "}
        </span>
      </div>
    );
  }
};

export default Dislike;
