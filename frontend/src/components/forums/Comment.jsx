import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/comments/post/${id}`
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
          Comments
        </span>
      </div>
    );
  }

  comments.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });

  return (
    <div className=" mt-10 p-5 mx -auto">
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600 ">
        Comments
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col bg-white-700 p-4 text-xl w-full mb-5"
            >
             <SingleComment comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
