/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  //const curuser = localStorage.getItem("user");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isprivacy, setIsprivacy] = useState("");

  useEffect(() => {
    if (post.privacy === "public") {
      setIsprivacy("private");
    } else {
      setIsprivacy("public");
    }
  }, [post.privacy]);

  const handleChangeprivacy = () => {
    // console.log(isprivacy);
    // console.log(post._id);

    if (
      window.confirm(`Are you sure you want to change post to ${isprivacy}`)
    ) {
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ privacy: isprivacy }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        });

      window.location.reload();
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <Link to={`/profile/${post.user._id}`}>
          <img
            src={`/images/${post.user.photo}`}
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <Link to={`/profile/${post.user._id}`}>
          <h1 className="text-1xl font-bold text-gray-800 ml-2">
            {post.user.name}
          </h1>
        </Link>
        <span className="text-gray-500 ml-2">
          {new Date(post.createdAt).toLocaleString()}
        </span>
        <div className="relative ml-auto">
          <span
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1.25em"
              viewBox="0 0 7 16"
            >
              <circle cx={3.5} cy={3.5} r={1.5} fill="black"></circle>
              <circle cx={3.5} cy={8.5} r={1.5} fill="black"></circle>
              <circle cx={3.5} cy={13.5} r={1.5} fill="black"></circle>
            </svg>
          </span>
          {isMenuOpen && (
            <div className="bg-white shadow-md p-2 rounded-lg right-0 absolute z-50 cursor-pointer">
              <ul>
                <li
                  className="hover:bg-gray-100 p-2 whitespace-nowrap"
                  onClick={handleChangeprivacy}
                >
                  {`Change post to ${isprivacy}`}
                </li>
                <li
                  className="hover:bg-gray-100 p-2 whitespace-nowrap"
                  onClick={handleDeletePost}
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Post content */}
      <Link to={`/forum/${post._id}`}>
        <p className="text-gray-700 font-bold">{post.title}</p>
      </Link>

      {/* Additional text */}
      <p className="text-gray-600 line-clamp-4">{post.post}</p>
    </div>
  );
};

export default SinglePost;
