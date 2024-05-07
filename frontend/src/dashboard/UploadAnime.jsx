import React, { useState } from "react";

import { Button, Label, TextInput, Textarea } from "flowbite-react";

const UploadAnime = () => {
  const animeCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Demons",
    "Historical",
    "Fantasy",
    "Horror",
    "Mecha",
    "Mystery",
    "Military",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Super Power",
    "Shounen",
    "School",
    "Sports",
    "Supernatural",
    "Parody",
    "Thriller",
  ];

  const [selectedAnimeCategories, setSelectedAnimeCategories] = useState(
    animeCategories[0]
  );

  const handleChangeSelectedValue = (e) => {
    console.log(e.target.value);
    setSelectedAnimeCategories(e.target.value);
  };

  //const handle anime submit
  const handleAnimeSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const type = form.type.value;
    const image = form.image.value;
    const genre = form.animeCategories.value; 
    const description = form.description.value;
    const episodes = form.episodes.value;
    const duration = form.duration.value;
    const status = form.status.value;
    const aired = form.aired.value;

    const animeData = {
      name,
      type,
      image,
      genre,
      description,
      episodes,
      duration,
      status,
      aired,
    };

    console.log(animeData);

    //send data to the server
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/animes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(animeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload an Anime</h2>
      <form onSubmit={handleAnimeSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className="flex gap-8">
          {/*animename*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              placeholder="Anime name"
              required
              type="text"
            />
          </div>

          {/*type*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Type" />
            </div>
            <TextInput id="type" placeholder="Type" required type="text" />
          </div>
        </div>

        <div className="flex gap-8">
          {/*animename*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="image" value="Image" />
            </div>
            <TextInput
              id="image"
              placeholder="Anime image"
              required
              type="text"
            />
          </div>

          {/*Categories*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Genre" />
            </div>

            <select
              id="inputState"
              name="animeCategories"
              className="w-full rounded"
              value={selectedAnimeCategories}
              onChange={handleChangeSelectedValue}
            >
              {animeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          {/*description*/}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder="Anime description..."
              required
              className="w-full"
              row={4}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/*episodes*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="episodes" value="Episodes" />
            </div>
            <TextInput
              id="episodes"
              placeholder="Number episodes"
              required
              type="text"
            />
          </div>

          {/*duration*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="duration" value="Duration" />
            </div>
            <TextInput id="duration" placeholder="Duration" required type="text" />
          </div>
        </div>
        <div className="flex gap-8">
          {/*status*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="status" value="Status" />
            </div>
            <TextInput
              id="status"
              placeholder="Status"
              required
              type="text"
            />
          </div>

          {/*type*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="aired" value="Aired" />
            </div>
            <TextInput id="aired" placeholder="Aired" required type="text" />
          </div>
        </div>

        <Button type="submit"  className="w-full bg-red-500" >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UploadAnime;
