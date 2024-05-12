/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Dislike from "./Dislike";

const PostUser = ({post,reaction}) => {
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  

  useEffect(() => {

    if (reaction[0] !== undefined && reaction[0].reaction === "like") {
      setIsLike(true);
      setIsDislike(false);
    } else if (
      reaction[0] !== undefined &&
      reaction[0].reaction === "dislike"
    ) {
      setIsDislike(true);
      setIsLike(false);
    }
  }, [reaction]);

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
      <p className="text-gray-600 ">{post.post}</p>

      <div className="flex items-center justify-between mt-4">
        {/* Votes */}
        <div className="flex items-center">
          <Like
            isLike={isLike}
            reaction={reaction}
            post={post}
            isDislike={isDislike}
          />
          <span>{post.likes}</span>
          <Dislike
            isDislike={isDislike}
            reaction={reaction}
            post={post}
            isLike={isLike}
          />
          <span>{post.dislikes}</span>
          <span className="text-gray-500 font-bold ml-10 cursor-pointer">
            <div className="group">
              <Link to={`/forum/${post._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.25em"
                  height="1.25em"
                  viewBox="0 0 24 24"
                  className="text-black-500"
                >
                  <path
                    fill="currentColor"
                    className="group-hover:text-white-700"
                    d="M19 2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11.59l3.7 3.71A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V5a3 3 0 0 0-3-3m1 16.59l-2.29-2.3A1 1 0 0 0 17 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                  ></path>
                </svg>
              </Link>
            </div>
          </span>
          <span className="ml-2">{post.numberComments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostUser;
