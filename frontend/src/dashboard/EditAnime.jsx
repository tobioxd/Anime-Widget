import React, { useState ,useEffect} from "react";
import {  useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

const EditAnmie = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    // Fetch anime data using the id
    const fetchAnime = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/animes//${id}`);
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  const {
    name,
    type,
    image,
    description,
    episodes,
    duration,
    genre,
    status,
    aired,
    producers,
    studios,
    previewpic1,
    previewpic2,
    previewpic3,
    previewlink,
  } = anime;

  //const handle anime submit
  const handleAnimeUpdate = (e) => {
    e.preventDefault();
    const animeData = {
      name: e.target.name.value,
      type: e.target.type.value,
      image: e.target.image.value,
      description: e.target.description.value,
      episodes: e.target.episodes.value,
      duration: e.target.duration.value,
      status: e.target.status.value,
      aired: e.target.aired.value,
      producers: e.target.producers.value,
      studios: e.target.studios.value,
      previewpic1: e.target.previewpic1.value,
      previewpic2: e.target.previewpic2.value,
      previewpic3: e.target.previewpic3.value,
      previewlink: e.target.previewlink.value,
    };

    //console.log(animeData);

    //Send data to the server
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(animeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        e.target.reset();
        alert("Anime updated successfully");
        window.location.href = "/admin/dashboard/manage-anime";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update an Anime</h2>
      <form
        onSubmit={handleAnimeUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
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
              defaultValue={name}
            />
          </div>

          {/*type*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Type" />
            </div>
            <TextInput
              id="type"
              placeholder="Type"
              required
              type="text"
              defaultValue={type}
            />
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
              defaultValue={image}
            />
          </div>

          {/*Categories*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Genre" />
            </div>
            <TextInput
              id="inputState"
              placeholder="Genre"
              required
              type="text"
              defaultValue={genre}
            />
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
              defaultValue={description}
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
              defaultValue={episodes}
            />
          </div>

          {/*duration*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="duration" value="Duration" />
            </div>
            <TextInput
              id="duration"
              placeholder="Duration"
              required
              type="text"
              defaultValue={duration}
            />
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
              defaultValue={status}
            />
          </div>

          {/*type*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="aired" value="Aired" />
            </div>
            <TextInput
              id="aired"
              placeholder="Aired"
              required
              type="text"
              defaultValue={aired}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/*previewpic1*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="previewpic1" value="Previewpic1" />
            </div>
            <TextInput
              id="previewpic1"
              placeholder="Previewpic1"
              required
              type="text"
              defaultValue={previewpic1}
            />
          </div>

          {/*previewpic2*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="previewpic2" value="Previewpic2" />
            </div>
            <TextInput
              id="previewpic2"
              placeholder="Previewpic2"
              required
              type="text"
              defaultValue={previewpic2}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/*previewpic3*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="previewpic3" value="Previewpic3" />
            </div>
            <TextInput
              id="previewpic3"
              placeholder="Previewpic3"
              required
              type="text"
              defaultValue={previewpic3}
            />

            {/*previewlink*/}
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="previewlink" value="Previewlink" />
              </div>
              <TextInput
                id="previewlink"
                placeholder="Previewlink"
                required
                type="text"
                defaultValue={previewlink}
              />
            </div>
          </div>
        </div>

        {/*producers*/}
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="producers" value="Producers" />
          </div>
          <TextInput
            id="producers"
            placeholder="Producers"
            required
            type="text"
            defaultValue={producers}
          />
        </div>

        {/*studios*/}
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="studios" value="Studios" />
          </div>
          <TextInput
            id="studios"
            placeholder="Studios"
            required
            type="text"
            defaultValue={studios}
          />
        </div>

        <Button type="update" className="w-full bg-red-500">
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditAnmie;


