import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";

const AnimePreview = () => {
    const {id} = useParams();
    const [anime, setAnime] = useState(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // Fetch anime data using the id
        const fetchAnime = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${id}`
                );
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

    const{
        previewpic1,
        previewpic2,
        previewpic3,
        previewlink
    } = anime;

    const images = [previewpic1, previewpic2, previewpic3];


  const nextImage = () => {
    const next = (current + 1) % images.length;
    setCurrent(next);
  };

  const prevImage = () => {
    const prev = (current - 1 + images.length) % images.length;
    setCurrent(prev);
  };

  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12">
        {/* left side*/}
        <div className=" md:w-2/3 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">Preview:</h1>
          <div className="relative flex items-center justify-center">
            <iframe
              width="600"
              height="380"
              src={previewlink}
              title="Anime Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* right side*/}
        <div className="mr-20">
          <div className="relative w-[400] h-[600px]">
            <img
              src={images[current]}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r-lg"
            >
              {" "}
              &#8249;{" "}
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l-lg"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePreview;

