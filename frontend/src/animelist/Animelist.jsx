import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { ImStarFull } from "react-icons/im";
import { Link } from "react-router-dom";

const Animelist = () => {
  const [animes, setAnime] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/animes")
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
      });
  }, []);

  return (
    <div className="mt-28 px-4 lg:px24">
      <h2 className="text-5xl font-bold text-center">All Animes are here</h2>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {animes.map((anime) => (
          <Card className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ml-4">
            <Link to={`/anime/${anime.id}`}>
              <img
                className="w-[340px] h-[510px] rounded-lg object-cover"
                src={anime.image}
                alt=""
              />
            </Link>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{anime.name}</p>
            </h5>
            <p className="font-bold text-gray-700 dark:text-gray-400">
              {anime.type}( {anime.episodes} eps)
            </p>
            <p className="text-gray-700 dark:text-gray-400 ">
              <ImStarFull className="inline -mt-[0.5vh] mr-1 text-yellow-400 " />
              {anime.rating}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Animelist;