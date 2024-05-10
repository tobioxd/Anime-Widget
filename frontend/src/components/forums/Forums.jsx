import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Forums() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsperPage = 10;
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState("time");
  //const curuserId = JSON.parse(localStorage.getItem("user"))._id;

  function handleRadioChange(event) {
    setFilters(event.target.value);
    setSearch("");
  }

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filterData = () => {
    if (!search) {
      return posts;
    }
    return posts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const fetchFilteredPosts = (filterType) => {
    if (filterType === "time") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/posts?sort=-createdAt")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    } else if (filterType === "likes") {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/posts?sort=-likes")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    } else if (filterType === "comments") {
      fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/posts?sort=-numberComments"
      )
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    }
  };

  useEffect(() => {
    fetchFilteredPosts(filters);
  }, [filters]);

  const handleLikeButton = () => {
    console.log("Like button clicked");
  };

  const handleDislikeButton = () => {
    console.log("Dislike button clicked");
  };

  const handleViewComments = () => {
    console.log("View Comments button clicked");
  };

  const indexOfLastPost = currentPage * postsperPage;
  const indexOfFirstPost = indexOfLastPost - postsperPage;
  const totalPosts = Math.ceil(filterData().length / postsperPage);
  const currentPosts = filterData().slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mt-40 mb-10 w-3/4 mx-auto">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 my-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-10"
          placeholder="Search for a post ..."
        />
        <div className="relative">
          <button
            onClick={handleFilterClick}
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Filter
          </button>
          {showFilter && (
            <div className="absolute left-0 mt-2 w-64 py-2 bg-white rounded-lg shadow-xl z-50">
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    id="byTime"
                    name="filter"
                    value="time"
                    checked={filters === "time"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="byTime">{" By time"}</label>
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="likes"
                    checked={filters === "likes"}
                    onChange={handleRadioChange}
                  />
                  {" By likes"}
                </label>
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="comments"
                    checked={filters === "comments"}
                    onChange={handleRadioChange}
                  />
                  {" By number of comments"}
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

      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-100 rounded-lg shadow-md mb-4 p-4"
        >
          <div className="flex items-center mb-2">
            <Link to={`/profile/${post.user._id}`}>
              <img src={post.user.photo} className="w-10 h-10 rounded-full" />
            </Link>
            <Link to={`/profile/${post.user._id}`}>
              <h1 className="text-1xl font-bold text-gray-800 ml-2">
                {post.user.name}
              </h1>
            </Link>
            <span className="text-gray-500 ml-2">
              {new Date(post.createdAt).toLocaleString()}
            </span>
            <span className="ml-auto cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.88em"
                height="1.25em"
                viewBox="0 0 7 16"
              >
                <circle cx={3.5} cy={3.5} r={1.5} fill="black"></circle>
                <circle cx={3.5} cy={8.5} r={1.5} fill="black"></circle>
                <circle cx={3.5} cy={13.5} r={1.5} fill="black"></circle>
              </svg>
            </span>
          </div>

          {/* Post content */}
          <Link to={`/`}>
            <p className="text-gray-700 font-bold">{post.title}</p>
          </Link>

          {/* Additional text */}
          <p className="text-gray-600 line-clamp-4">{post.post}</p>

          <div className="flex items-center justify-between mt-4">
            {/* Votes */}
            <div className="flex items-center">
              <span
                className="text-green-500 font-bold cursor-pointer"
                onClick={handleLikeButton}
              >
                <div className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    className="text-blue-400"
                  >
                    <path
                      fill="currentColor"
                      className="group-hover:text-blue-600"
                      d="m17.71 11.29l-5-5a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-5 5a1 1 0 0 0 1.42 1.42L11 9.41V17a1 1 0 0 0 2 0V9.41l3.29 3.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
                    ></path>
                  </svg>
                </div>
              </span>
              <span>{post.likes}</span>
              <span
                className="text-red-500 font-bold cursor-pointer"
                onClick={handleDislikeButton}
              >
                <div className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      className="text-red-400 group-hover:text-red-600"
                      d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42"
                    ></path>
                  </svg>
                </div>{" "}
              </span>
              <span>{post.dislikes}</span>
              <span
                className="text-gray-500 font-bold ml-10 cursor-pointer"
                onClick={handleViewComments}
              >
                <div className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25em"
                    height="1.25em"
                    viewBox="0 0 24 24"
                    className="text-black-500"
                  >
                    <path
                      fill="currentColor"
                      className="group-hover:text-white-700"
                      d="M19 2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11.59l3.7 3.71A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V5a3 3 0 0 0-3-3m1 16.59l-2.29-2.3A1 1 0 0 0 17 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
                    ></path>
                  </svg>
                </div>
              </span>
              <span className="ml-2">{post.numberComments}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-10">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#8249;
        </button>

        {[...Array(totalPosts).keys()].map((_, index) => {
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
          disabled={currentPage >= Math.ceil(posts.length / postsperPage)}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none ${
            currentPage >= Math.ceil(posts.length / postsperPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Forums;
