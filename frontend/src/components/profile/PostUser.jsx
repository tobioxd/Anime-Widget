import React, { useEffect, useState } from "react";
import MySinglePost from "./MySinglePost";
import { useParams } from "react-router-dom";

function PostGuest() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsperPage = 5;
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/posts/blog/${userId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  posts.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });

  const indexOfLastPost = currentPage * postsperPage;
  const indexOfFirstPost = indexOfLastPost - postsperPage;
  const totalPosts = Math.ceil(posts.length / postsperPage);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mt-40 mb-10 w-3/4 mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">
        All Post of {user.name} are here
      </h2>
      {currentPosts.map(
        (post) =>
          (
            <div
              key={post._id}
              className="bg-gray-100 rounded-lg shadow-md mb-4 p-4"
            >
              <MySinglePost post={post} />
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

export default PostGuest;
