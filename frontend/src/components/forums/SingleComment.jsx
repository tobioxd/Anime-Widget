/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReplyComments from "./ReplyComments";
import { Link } from "react-router-dom";

const SingleComment = ({ comment }) => {
  const [showrepliescomment, setShowrepliescomment] = useState(false);

  const toggleShowRepliesComment = () => {
    setShowrepliescomment(!showrepliescomment);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={`/images/${comment.user.photo}`}
            alt="user"
            className="w-12 h-12 rounded-full cursor-pointer "
            onClick={() =>
              window.location.replace(`/profile/${comment.user._id}`)
            }
          />
          <span className="ml-4 text-lg font-bold">{comment.user.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold">
            {new Date(comment.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
      </div>
      <span style={{ fontFamily: "Segoe UI Historic, sans-serif" }}>
        {comment.comment}
      </span>
      <Link onClick={toggleShowRepliesComment}>
        <span className="flex justify-end text-xs font-bold">
          {"Show replies comments "}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25em"
            height="1.25em"
            viewBox="0 0 24 24"
            className="text-black-500 flex justify-end cursor-pointer mt-1 hover:text-black-700"
          >
            <path
              fill="currentColor"
              className="group-hover:text-white-700"
              d="M19 2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11.59l3.7 3.71A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V5a3 3 0 0 0-3-3m1 16.59l-2.29-2.3A1 1 0 0 0 17 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
            ></path>
          </svg>
        </span>
      </Link>
      {showrepliescomment && <ReplyComments commentId={comment._id} />}
    </div>
  );
};

export default SingleComment;
