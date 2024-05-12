/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import NewReplyComment from "./NewReplyComment";

const ReplyComments = ({ commentId }) => {
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const fetchReplyComments = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            `/api/v1/comments/${commentId}/allreplycomments`
        );
        const data = await res.json();
        setReplyComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReplyComments();
  }, [commentId]);

  if (replyComments.length === 0) {
    return <div className="scale-75 transform">
      <NewReplyComment commentId={commentId}/>
    </div>;
  }

  replyComments.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });

  return (
    <div className="scale-75 transform">
      <NewReplyComment commentId={commentId}/>
      {replyComments.map((replyComment) => (
        <div
          key={replyComment._id}
          className="flex flex-col bg-white-700 p-4 text-xl w-full mb-5"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={`/images/${replyComment.user.photo}`}
                alt="user"
                className="w-12 h-12 rounded-full cursor-pointer "
                onClick={() =>
                  window.location.replace(`/profile/${replyComment.user._id}`)
                }
              />
              <span className="ml-4 text-lg font-bold">
                {replyComment.user.name}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold">
                {new Date(replyComment.createdAt).toLocaleString(undefined, {
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
            {replyComment.replycomment}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReplyComments;
