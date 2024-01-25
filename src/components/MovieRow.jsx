import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieItems from './MovieItems';
import {MdChevronLeft ,MdChevronRight} from 'react-icons/md'

const MovieRow = ({title, url}) => {

  const rowID = Math.floor(Math.random() * 1000)

  const [movies , setMovies] = useState([]);

  useEffect(()=> {
    axios.get(url).then(respone => setMovies(respone.data.results));
  }, [url])

  const slide = (offset) => {
    const slider = document.getElementById('slider'+rowID);
    slider.scrollLeft = slider.scrollLeft + offset;
  }


  return (
    <>
    <h2 className="font-nsans-bold capitalize md:text-lg px-4">{title}</h2>
    <div className="relative flex items-center group">
      <MdChevronLeft onClick={()=> slide(-500)} className="bg-white rounded-full absolute left-3 opacity-80 text-gray-700 z-40 hidden group-hover:block cursor-pointer" size={30}  />
      <div id={`slider`+rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
        {movies.map(movie => (
          <MovieItems key={movie.id} movie={movie} />
        ))}
      </div>
      <MdChevronRight onClick={()=> slide(500)} className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-40 hidden group-hover:block cursor-pointer" size={30} />
    </div>
    </>
  )
}

export default MovieRow