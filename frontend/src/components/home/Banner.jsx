import React from "react";
import BannerCard from "../../home/BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* left side*/}
        <div className=" md:w-1/2 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-red-600">Anime</span> World
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Welcome to the ultimate anime haven! 🌟 Dive into a world where
            imagination meets reality, and every frame tells a story. Whether
            you’re a seasoned otaku or new to the realm of anime, we’ve got
            something special for you. From the classics that set our hearts
            racing to the latest releases that have us on the edge of our seats,
            this is your one-stop destination for all things anime.
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search an anime"
              className="py-2 px-2 rounded-s-sm outline-none"
            />
            <button className="bg-red-600 px-6 py-2 text-white font-medium hover:bg-pink
            transition-all ease-in duration-200">
              Search
            </button>
          </div>
        </div>

        {/* right side*/}
        <div>
            <BannerCard/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
