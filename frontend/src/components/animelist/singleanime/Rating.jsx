import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";

const Rating = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const user = localStorage.getItem("user");
  const userid = JSON.parse(user)._id;
  const currole = JSON.parse(user).role;
  const [selectedRatingCategories, setSelectedRatingCategories] =
    useState(null);
  const [Currating, setRating] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(true);
  const [favId, setFavId] = useState(null);

  const ratingCategories = [
    "Select Rating ⭐",
    "(1) Appalling",
    "(2) Horrible",
    "(3) Very Bad",
    "(4) Bad",
    "(5) Average",
    "(6) Fine",
    "(7) Good",
    "(8) Very Good",
    "(9) Great",
    "(10) Masterpiece",
  ];

  useEffect(() => {
    // Fetch review data using the id
    const fetchReview = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            `/api/v1/users/${userid}/reviews/${id}`
        );
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error(error);
      }
      setLoaded(true);
    };

    fetchReview();
    if (review) {
      setSelectedRatingCategories(ratingCategories[review.rating]);
      setRating(ratingCategories[review.rating]);
      setReviewId(review._id);
    } else {
      setSelectedRatingCategories("Select Rating ⭐");
    }

    // Check if the anime is in the favourite list
    const fetchFavourite = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/favouriteAnime/${userid}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "fail") {
          setIsFavorite(false);
        }
        setFavId(data._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavourite();
  }, [id, userid, loaded]);

  const handleChangeSelectedValue = (e) => {
    //console.log(e.target.value);
    setSelectedRatingCategories(e.target.value);
  };

  const handleAddToFavourite = (e) => {
    if (currole === "user") {
      if (
        window.confirm("Are you sure you want to add this anime to favourite?")
      ) {
        e.preventDefault();
        const favouriteData = {
          anime: id,
          user: userid,
        };
        //send data to the server
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/favouriteAnime`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(favouriteData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("Anime added to favourite successfully !");
            setIsFavorite(true);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      alert("You don't have permission to add this anime to favourite !");
    }
  };

  const handleRemoveFromFavourite = (e) => {
    if (
      window.confirm(
        "Are you sure you want to remove this anime from favourite?"
      )
    ) {
      e.preventDefault();
      //send data to the server
      fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/v1/favouriteAnime/${favId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Anime removed from favourite successfully !");
          setIsFavorite(false);
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        window.location.reload();
    }
  };

  const handleSubmitRating = (e) => {
    if (currole === "user") {
      if (window.confirm("Are you sure you want to submit the rating?")) {
        e.preventDefault();
        if (
          selectedRatingCategories === ratingCategories[0] ||
          selectedRatingCategories === Currating
        ) {
          return;
        }
        const rating = ratingCategories.indexOf(selectedRatingCategories);
        const reviewData = {
          rating: rating,
        };

        //send data to the server
        fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/reviews/${reviewId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(reviewData),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setRating(selectedRatingCategories);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      alert("You don't have permission to rate this anime !");
    }
  };

  return (
    <div>
      <div className="flex">
        {isFavorite ? (
          <Button
            onClick={handleRemoveFromFavourite}
            className="w-full bg-yellow-400 text-white hover:bg-yellow-500 transition-all ease-in duration-200"
          >
            Added Favourite
          </Button>
        ) : (
          <Button
            onClick={handleAddToFavourite}
            className="w-full bg-red-500 text-white hover:bg-red-600 transition-all ease-in duration-200"
          >
            Add to Favourite
          </Button>
        )}
      </div>
      <form className="flex">
        <select
          id="inputState"
          name="animeCategories"
          className="w-2/3 rounded"
          value={selectedRatingCategories}
          onChange={handleChangeSelectedValue}
        >
          {ratingCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Button
          onClick={handleSubmitRating}
          className="w-1/3 bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Rating;
