/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  //const curuser = localStorage.getItem("user");

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
        <span className="ml-auto cursor-pointer">
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
