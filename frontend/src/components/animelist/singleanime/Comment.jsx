import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${id}/reviews`
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [id]);

  if (comments.length === 0) {
    return (
      <div>
        <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600 ">
          Other Reviews
        </span>
      </div>
    );
  }


  return (
    <div>
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600 ">
        Other Reviews
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col bg-white-700 p-4 text-xl w-full"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={`/images/${comment.user.photo}`}
                    alt="user"
                    className="w-12 h-12 rounded-full cursor-pointer "
                    onClick={() => window.location.replace(`/profile/${comment.user._id}`)}
                  />
                  <span className="ml-4 text-lg font-bold">
                    {comment.user.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">
                    {new Date(comment.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                  </span>
                </div>
              </div>
              <span style={{ fontFamily: "Segoe UI Historic, sans-serif" }}>
                {comment.review}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
