import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import RatingGuest from "./RatingGuest";

const AnimeInfor = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    // Fetch anime data using the id
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${id}`
        );
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  const {
    name,
    type,
    image,
    description,
    rating,
    favorites,
    ratingsQuantity,
    episodes,
    duration,
    genre,
    status,
    aired,
    producers,
    studios,
  } = anime;

  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* left side*/}
        <div>
          <img
            src={image}
            alt={name}
            className="w-[420px] h-[630px] rounded-lg object-cover "
          />
          < RatingGuest/>
        </div>

        {/* right side*/}
        <div className="w-4/5">
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-gray-600 font-bold mb-2">Type: {type}</p>
          <p className="text-gray-600 font-bold mb-2">Episodes: {episodes}</p>
          <p className="text-gray-600 font-bold mb-2">
            Rating: {rating}{" "}
            <ImStarFull className="inline -mt-[0.5vh] mr-1 text-yellow-400 " />
            (from {ratingsQuantity} users)
          </p>
          <p className="text-gray-600 font-bold mb-2">Favorites: {favorites}</p>
          <p className="text-gray-600 font-bold mb-2">Duration: {duration}</p>
          <p className="text-gray-600 font-bold mb-2">
            Genre: {genre.join(", ")}
          </p>
          <p className="text-gray-600 font-bold mb-2">Status: {status}</p>
          <p className="text-gray-600 font-bold mb-2">Aired: {aired}</p>
          <p className="text-gray-600 font-bold mb-2">Producers: {producers}</p>
          <p className="text-gray-600 font-bold mb-2">Studios: {studios}</p>
          <p className="text-gray-600 font-bold mb-2">
            Description: {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfor;
