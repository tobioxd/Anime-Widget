import React,{useEffect,useState} from 'react'
import AnimeCard from './AnimeCard'

const FavouriteAnime = () => {

    const [animes, setAnime] = useState([])

    useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/v1/animes/top-7-anime')
        .then(res => res.json())
        .then(data => {
            setAnime(data)
        })
    }, [])

  return (
    <div >
        <AnimeCard animes={animes} headline="Best Rating Anime"/>
    </div>
  )
}

export default FavouriteAnime