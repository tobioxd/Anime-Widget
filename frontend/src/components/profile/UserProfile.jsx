import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FavouriteAnime from "./FavouriteAnime";
import MyProfile from "./MyProfile";

const UserProfile = () => {
  const { userId } = useParams();
  console.log(userId);
  const [user, setUser] = useState(null);
  const curUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, bio, photo } = user;

  

  if (curUser && JSON.parse(curUser)._id === userId){
    return (
      <div className="mt-28 px-4 lg:px24">
        <div className="flex flex-col items-center">
          <img
            src={photo}
            alt=""
            className="w-40 h-40 rounded-full object-cover"
          />
          <h2 className="text-5xl font-bold text-center">{name}</h2>
          <p className="text-2xl text-center">{bio}</p>
        </div>
        <MyProfile  />
      </div>
    );
  } else {
    return (
      <div className="mt-28 px-4 lg:px24">
        <div className="flex flex-col items-center">
          <img
            src={photo}
            alt=""
            className="w-40 h-40 rounded-full object-cover"
          />
          <h2 className="text-5xl font-bold text-center">{name}</h2>
          <p className="text-2xl text-center">{bio}</p>
        </div>
        <FavouriteAnime  />
      </div>
    );
  }
};

export default UserProfile;
