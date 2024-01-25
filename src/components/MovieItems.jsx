import React, { useState } from "react";
import { createImgURL } from "../services/moveiApi";
import { FaHeart,FaRegHeart } from "react-icons/fa6";
import {arrayUnion , doc , updateDoc} from 'firebase/firestore';
import {db} from '../services/firebase'
import { UserAuth } from "../context/Authcontext";

const MovieItems = ({ movie }) => {

const [like, setLike] = useState(false);
const {user } = UserAuth();

const {title ,backdrop_path,poster_path} = movie;

const markedFav = async () => {
  const emailAdd = user?.email;

  if(emailAdd){
    const userDoc = doc(db , 'users' ,emailAdd);
    setLike(!like);
    await updateDoc(userDoc, {
      favShows : arrayUnion({...movie})
    })
  }else{
    alert('login to save movie..!');
  }
}

  return (
    <div className="relative w-[160px] sm:w-[150px] md:w-[180px] lg:w-[165px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
        <img className="w-full md:h-27 h-24 block object-cover object-top" src={createImgURL(backdrop_path ?? poster_path,'w500')} alt={title} />
      
    <div className="absolute top-0 left-0 md:h-28 h-24 w-full bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">{title}</p>
        <p onClick={markedFav}>{like ? <FaHeart size={20} className="absolute top-2 left-2 text-gray-200" /> : <FaRegHeart size={20} className="absolute top-2 left-2 text-gray-200" />}</p>
    </div>
    </div>
  );
};

export default MovieItems;
