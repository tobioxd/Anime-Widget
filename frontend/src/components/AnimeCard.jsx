import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

//import './styles.css';

// import required modules
import { Pagination } from "swiper/modules";

const AnimeCard = ({ headline, animes }) => {
  console.log(animes);

  return (
    <div>
      <h2 className="text-5xl text-center font-bold text-black my-5">
        {headline}
      </h2>

      {/* Swiper */}
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {Array.isArray(animes) &&
            animes.map((anime) => (
              <SwiperSlide key={anime.id} >
                <Link to="/" className="flex flex-col items-center">
                  <div className="">
                    <img
                      src={anime.image}
                      alt=""
                      className="w-60 h-90g rounded-lg"
                    />
                  </div>

                  <div className="text-2xl bg-white bg-opacity-50 w-full text-center">
                    <h3>{anime.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AnimeCard;
