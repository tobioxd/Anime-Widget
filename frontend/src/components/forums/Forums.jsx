import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import NewPost from "./NewPost";

function Forums() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsperPage = 10;
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState("time");
  const curuser = localStorage.getItem("user");
  const [reactions, setReactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  function handleRadioChange(event) {
    setFilters(event.target.value);
    fetchFilteredPosts(filters);
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
    if (curuser) {
      const curuserId = JSON.parse(curuser)._id;
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/reactions/${curuserId}`)
        .then((res) => res.json())
        .then((data) => {
          setReactions(data);
        });
    }

    fetchFilteredPosts(filters);
  }, [filters]);

  const indexOfLastPost = currentPage * postsperPage;
  const indexOfFirstPost = indexOfLastPost - postsperPage;
  const totalPosts = Math.ceil(filterData().length / postsperPage);
  const currentPosts = filterData().slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mt-40 mb-10 w-3/4 mx-auto">
      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
          {/* Your form goes here */}
          <div className="mt-40 mb-10 w-3/4 mx-auto">
            <NewPost />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                <span>Cancle</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          <span>Add new post</span>
        </button>
      </div>
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

      {currentPosts.map(
        (post) =>
          post.privacy === "public" && (
            <div
              key={post._id}
              className="bg-gray-100 rounded-lg shadow-md mb-4 p-4"
            >
              <SinglePost
                post={post}
                reaction={reactions.filter(
                  (reaction) => reaction.post === post._id
                )}
              />
            </div>
          )
      )}

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
