import React from "react";

const MyCommentGuest = () => {
  const handleLoginReview = () => {
    alert("You have to login to comment ! Please login first.");
  };

  return (
    <div>
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600">
        Comment
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          <input
            type="text"
            placeholder={"Write your comment here"}
            className="p-4 border-1[px] border-zinc-400 text-lg font-sans"
          />
          <div className="flex justify-end">
            <button
              className="bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200 p-2 text-xl"
              onClick={handleLoginReview}
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommentGuest;
