import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [favouriteAnime, setFavouriteAnime] = useState([]);
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}/favAnime`)
      .then((res) => res.json())
      .then((data) => {
        setFavouriteAnime(data);
      });

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!favouriteAnime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-28 px-4 lg:px24">
      <h2 className="text-5xl font-bold text-center">
        All Favourite Animes of {user.name} are here
      </h2>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {favouriteAnime.map((favanime) => (
          <Card
            key={favanime.id}
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ml-4"
          >
            <Link to={`/anime/${favanime.anime.id}`}>
              <img
                className="w-[340px] h-[510px] rounded-lg object-cover"
                src={favanime.anime.image}
                alt=""
              />
            </Link>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{favanime.anime.name}</p>
            </h5>
            <Button
              className="mt-4 bg-red-500"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove this anime from your favourite list?"
                  )
                ) {
                  fetch(
                    import.meta.env.VITE_BACKEND_URL +
                      `/api/v1/favouriteAnime/${favanime.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    });
                  window.location.reload();
                }
              }}
            >
              Remove from Favourite
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
