import React from "react";
import Banner from "../components/home/Banner";
import FavouriteAnime from "../components/home/FavouriteAnime";

const Home = () => {
  const user = localStorage.getItem("user");

  if (user) {
    const userObj = JSON.parse(user);
    if (userObj.role === "admin") {
      return (
        <div>
          <Banner />
          <FavouriteAnime />
        </div>
      );
    } else if (userObj.role === "user") {
      return (
        <div>
          <Banner />
          <FavouriteAnime />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Banner />
        <FavouriteAnime />
      </div>
    );
  }
};

export default Home;
