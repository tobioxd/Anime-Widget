import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { ImStarFull } from "react-icons/im";
import { Link } from "react-router-dom";

const Animelist = () => {
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const animesPerPage = 12;
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState("");

  function handleRadioChange(event) {
    setFilters(event.target.value);
    setSearch("");
    
  }

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const fetchAnimes = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes")
      .then((res) => res.json())
      .then((data) => {
        setFilteredAnimes(data);
      });
  };

  const fetchFilteredAnimes = (filterType) => {
    if (filterType === "name") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes?sort=name")
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnimes(data);
        });
    } else if (filterType === "rating") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes?sort=-rating")
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnimes(data);
        });
    } else if (filterType === "episodes") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes?sort=-episodes")
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnimes(data);
        });
    } else if (filterType === "favourite") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes?sort=-favorites")
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnimes(data);
        });
    } else if (filterType === "finishedAiring") {
      fetch(
        import.meta.env.VITE_BACKEND_URL +
          "/api/v1/animes?status=Finished Airing"
      )
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnimes(data);
        });
    } else {
      fetchAnimes();
    }
  };
  useEffect(() => {
    fetchFilteredAnimes(filters);
  }, [filters]);

  const filterData = () => {
    if (!search) {
      return filteredAnimes;
    }
    return filteredAnimes.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // const handleSearchClick = () => {
  //   console.log(search);
  //   setFilteredAnimes(
  //     filteredAnimes.filter((anime) =>
  //       anime.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  //   console.log(filteredAnimes);
  // };

  // Calculate the index of the first and last anime on the current page
  const indexOfLastAnime = currentPage * animesPerPage;
  const indexOfFirstAnime = indexOfLastAnime - animesPerPage;
  const totalPages = Math.ceil(filterData().length / animesPerPage);

  // Get the animes for the current page
  const currentAnimes = filterData().slice(
    indexOfFirstAnime,
    indexOfLastAnime
  );

  return (
    <div className="mt-28 px-4 lg:px24">
      <h2 className="text-5xl font-bold text-center">All Animes are here</h2>

      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 my-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-10"
          placeholder="Search for an anime..."
        />
        <div className="relative">
          <button
            onClick={handleFilterClick}
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Filter
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-64 py-2 bg-white rounded-lg shadow-xl z-50">
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="name"
                    checked={filters === "name"}
                    onChange={handleRadioChange}
                  />
                  {" By name"}
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="rating"
                    checked={filters === "rating"}
                    onChange={handleRadioChange}
                  />
                  {" By rating"}
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="episodes"
                    checked={filters === "episodes"}
                    onChange={handleRadioChange}
                  />
                  {" By number of episodes"}
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="favourite"
                    checked={filters === "favourite"}
                    onChange={handleRadioChange}
                  />
                  {" By number favourite"}
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="finishedAiring"
                    checked={filters === "finishedAiring"}
                    onChange={handleRadioChange}
                  />
                  {" Status: finished airing"}
                </label>
              </div>
            </div>
          )}
        </div>
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {currentAnimes.map((anime) => (
          <Card
            key={anime.id}
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ml-4"
          >
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

      <div className="flex justify-center space-x-4 mb-5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#8249;
        </button>

        {[...Array(totalPages).keys()].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-4 py-2 text-white ${
                pageNumber === currentPage ? "bg-blue-700" : "bg-blue-500"
              } rounded hover:bg-blue-700 focus:outline-none`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentAnimes.length < animesPerPage}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none ${
            currentAnimes.length < animesPerPage
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Animelist;
