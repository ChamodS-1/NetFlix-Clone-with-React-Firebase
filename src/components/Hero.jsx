import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints,{createImgURL} from '../services/moveiApi';


const Hero = () => {

  const [movie , setMovie] = useState({});
  useEffect(()=> {
    axios.get(endpoints.popular).then(respone => {

      const movies = respone.data.results;
      const randomMovies = movies[Math.floor(Math.random() * movies.length)]
      
      setMovie(randomMovies);
    });
  }, [])


  const truct = (string, length) => {
    if(!string) return "";

    return string.length > length ? string.slice(0 ,length) + '...' : string
  }

  if(!movie)
    return (
      <>
      <p>Fetching...</p>
      </>
  
      );
    const {title , backdrop_path , release_date , overview} =  movie;  

  return (
    <div className="w-full h-[350px] lg:h-[460px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[350px] lg:h-[460px] bg-gradient-to-r from-black" />
          <img className="w-full h-full object-cover object-top" src={createImgURL(backdrop_path,'original')} alt={title} />

      <div className="absolute w-full top-[14%] lg:top-[25%] p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-nsans-bold">{title}</h1>
      <div className="mt-8 mb-4">

        <button className="capitalize border bg-gray-200 rounded-md text-black font-bold py-2 px-5 hover:scale-95 duration-200">Play</button>
        <button className="capitalize border border-gray-200 rounded-md py-2 px-5 ml-4 hover:scale-95 duration-200">Watch Later</button>
      </div>

      <p className="text-gray-400 text-sm">{release_date}</p>
      <p className=" w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-sm text-gray-200">{truct(overview,120)}</p>
     

      </div>
      </div>
    </div>
  )
}

export default Hero