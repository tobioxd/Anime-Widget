import React, { useState} from 'react'

const NewReplyCommentUser = (commentId) => {
  const [newComment, setnewComment] = useState("");
  const curuserId = JSON.parse(localStorage.getItem("user"))._id;
  const curcommentid = commentId.commentId;

  const handlenewChange = (event) => {
    setnewComment(event.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    const commentData = {
      replycomment: newComment,
      createdAt : new Date(),
      user: curuserId,
    };

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/comments/${curcommentid}/replycomments   `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setnewComment("");
        alert("Comment added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  return (
    <div className="mt-10">
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600">
        Add Comment
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          <input
            type="text"
            placeholder={"Write your review here"}
            value={newComment}
            onChange={handlenewChange}
            className="p-4 border-1[px] border-zinc-400 text-lg font-sans"
          />
          <div className="flex justify-end">
            <button
              className="bg-sky-400 text-white hover:bg-blue-600 transition-all ease-in duration-200 p-2 text-xl"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReplyCommentUser