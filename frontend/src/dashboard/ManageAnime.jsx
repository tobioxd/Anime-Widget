import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const ManageAnime = () => {
  const [allAnime, setAllAnime] = useState([]);

  useEffect(() => {
    const fetchAllAnime = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/animes/anime-list"
        );
        const data = await res.json();
        setAllAnime(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAnime();

    const element = document.querySelector("#root > div > div > div > div");
    if (element) {
      element.remove();
    }
  }, []);

  // Delete a anime
  const handleDelete = async (id) => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllAnime(allAnime.filter((anime) => anime._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allAnime);

  return (
    <div className="px-4 my-12 overflow -x-auto">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Anime</h2>
      <>
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-left whitespace-nowrap">
              No
            </Table.HeadCell>
            <Table.HeadCell className="text-left whitespace-nowrap">
              Anime name
            </Table.HeadCell>
            <Table.HeadCell className="text-left whitespace-nowrap">
              Genre
            </Table.HeadCell>
            <Table.HeadCell className="text-left whitespace-nowrap">
              Producers
            </Table.HeadCell>
            <Table.HeadCell className="text-left whitespace-nowrap">
              Studios
            </Table.HeadCell>
            <Table.HeadCell className="text-left whitespace-nowrap">
              <span>Edit or Manage</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allAnime.map((anime, index) => (
              <Table.Row
                key={anime._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {anime.name}
                </Table.Cell>
                <Table.Cell>{anime.genre.join(", ")}</Table.Cell>
                <Table.Cell>{anime.producers}</Table.Cell>
                <Table.Cell>{anime.studios}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/admin/dashboard/edit-anime/${anime._id}`}
                    className="font-medium text-cyan-600 dark:text-cyan-500 mr-5 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(anime._id)}
                    className="bg-sky-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    </div>
  );
};

export default ManageAnime;
