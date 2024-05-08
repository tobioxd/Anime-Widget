import React, { useState } from "react";
import { Button } from "flowbite-react";

const Rating = () => {
  const [selectedRatingCategories, setSelectedRatingCategories] =
    useState("");

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

  const handleChangeSelectedValue = (e) => {
    //console.log(e.target.value);
    setSelectedRatingCategories(e.target.value);
  };

  const handleSubmitRating = () => {
    alert("You have to login to rate this anime ! Please login first."); 
  };

  const handleAddToFavourite = () => {
    alert("You have to login to add this anime to favourite ! Please login first.");
  };

  return (
    <div>
      <div className="flex">
        <Button
          onClick={handleAddToFavourite}
          className="w-full bg-red-500 text-white hover:bg-red-600 transition-all ease-in duration-200"
        >
          Add to Favourite
        </Button>
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
