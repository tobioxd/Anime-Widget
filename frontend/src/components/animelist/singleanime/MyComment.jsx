import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyComment = () => {
  const { id } = useParams();
  const [myReview, setReview] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [noReview, setNoReview] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const curuser = localStorage.getItem("user");
  const userid = JSON.parse(curuser)._id;
  const [newReview, setnewReview] = useState(null);

  useEffect(() => {
    // Fetch review data using the id
    const fetchReview = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            `/api/v1/users/${userid}/reviews/${id}`
        );
        const data = await response.json();

        if (
          data.status === "fail" &&
          data.message === "No review found with that ID"
        ) {
          setNoReview(true);
          setLoaded(true);
          return;
        }

        setReview(data);
      } catch (error) {
        console.error(error);
      }
      setLoaded(true);
      const { review } = myReview;
      setInputValue(review);
    };

    fetchReview();
  }, [id, userid, loaded]);

  const currole = JSON.parse(localStorage.getItem("user"));

  const handlenewChange = (event) => {
    setnewReview(event.target.value);
  };

  const handleLoginReview = () => {
    alert("You don't have permission to comment");
  };

  const handleAddReview = (event) => {
    event.preventDefault();
    const reviewData = {
      review: newReview,
      createdAt: new Date(),
      anime: id,
      user: userid,
    };

    //send data to the server
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setnewReview(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.location.href = `/anime/${id}`;
  };

  if (noReview || !myReview) {
    if (currole.role === "user") {
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
                value={newReview}
                onChange={handlenewChange}
                className="p-4 border-1[px] border-zinc-400 text-lg font-sans"
              />
              <div className="flex justify-end">
                <button 
                  className="bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200 p-2 text-xl"
                  onClick={handleAddReview}  
                >
                  Add comment
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
    }
  }

  const { _id, review, createdAt, user } = myReview;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  const { name, photo } = user || {};

  //console.log(name, photo, review, createdAt);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditButton = () => {
    setIsEditing(true);
    console.log("Edit button clicked");
  };

  const handleDeleteButton = (e) => {
    if (window.confirm("Are you sure you want to delete the review?")) {
      e.preventDefault();
      //send data to the server
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reviews/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      window.location.href = `/anime/${id}`;
    }
  };

  const handleSaveButton = (e) => {
    if (window.confirm("Are you sure you want to save the changes?")) {
      e.preventDefault();
      const reviewData = {
        review: inputValue,
        createdAt: new Date(),
      };

      //send data to the server
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reviews/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reviewData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setReview(data);
          setInputValue(data.review);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      window.location.href = `/anime/${id}`;
    }
  };

  return (
    <div>
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600">
        My Comment
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full">
            <div className="flex justify-between">
              <div className="flex">
                <div className="w-10 h-10 text-center rounded-full bg-red-500">
                  <img
                    src={photo}
                    alt={name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <span>{name}</span>
              </div>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="p-4 border-1[px] border-zinc-400 text-lg font-sans"
              />
            ) : (
              <span className="text-lg font-sans">{review}</span>
            )}

            <div className="flex justify-between">
              <span className="">{formattedDate} </span>
              {isEditing ? (
                <button
                  className="bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200 p-2 text-xl"
                  onClick={handleSaveButton}
                >
                  Save
                </button>
              ) : (
                <div className="">
                  <button
                    className="w-2/3 bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200"
                    onClick={handleEditButton}
                  >
                    Edit
                  </button>
                  <button
                    className="w-2/3 bg-red-500 text-white hover:bg-red-600 transition-all ease-in duration-200"
                    onClick={handleDeleteButton}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComment;
