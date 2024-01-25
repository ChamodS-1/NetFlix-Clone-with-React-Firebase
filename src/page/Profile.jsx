import React, { useEffect, useState } from 'react';
import {MdChevronLeft ,MdChevronRight} from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';
import { UserAuth } from '../context/Authcontext';
import {db} from '../services/firebase';
import {createImgURL} from '../services/moveiApi';
import {arrayRemove, doc, onSnapshot, updateDoc} from 'firebase/firestore'

const Profile = () => {

  const [movies ,setMovies ] = useState([]);
  const {user} = UserAuth();

  let msg ='';

  useEffect(() => {

    if(user){
      onSnapshot(doc(db , 'users', `${user.email}`) , (doc) => {
        if(doc.data()) setMovies(doc.data().favShows);
      } )
    }

  }, [user?.email]);

  function empty(){
    return movies.length === 0 ? 'No Saved' : 'Saved';
  }


  const slide = (offset) => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + offset;
  }

  const unlikedHandle = async(movie) => {

    const userDocs = doc(db , 'users' , user.email);

    await updateDoc(userDocs , {
      favShows : arrayRemove(movie)
      
    });
  }

 if(!user){
  return(
    <>
    <p>Errorr</p>
    </>
  )
 }

  return (
    <>
    <div>
      <div>
      <img className="block w-full h-[500px] object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/050d249e-619a-4fbb-90c0-1a0c4ce1d7b8/LK-en-20240115-trifectadaily-perspective_alpha_website_small.jpg" alt="" />
      <div className="bg-black/60 w-full h-[500px] fixed top-0 left-0" />
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">My Saved</h1>
        <p className="font-nsans-light text-gray-500 text-lg">{user.email}</p>
      </div>
      </div>



      {/*row*/}

      <h2 className="font-nsans-bold capitalize md:text-lg px-5 pt-3">{empty()}</h2>
    <div className="relative flex items-center group">
      <MdChevronLeft onClick={()=> slide(-500)} className="bg-white rounded-full absolute left-3 opacity-80 text-gray-700 z-40 hidden group-hover:block cursor-pointer" size={30}  />
      <div id={`slider`} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">

        {movies.map( movie => (
          
          

          <div key={movie.id} className="relative w-[160px] sm:w-[150px] md:w-[180px] lg:w-[165px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
          <img className="w-full md:h-27 h-24 block object-cover object-top" src={createImgURL(movie.backdrop_path ?? movie.poster_path,'w500')} alt={movie.title} />
        
      <div className="absolute top-0 left-0 md:h-28 h-24 w-full bg-black/80 opacity-0 hover:opacity-100">
          <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">{movie.title}</p>

          <p>
            <AiOutlineClose size={20}  className="absolute top-2 right-2" onClick={()=> unlikedHandle(movie)}/>
          </p>
          
      </div>
      </div>









        ))}
      </div>
      <MdChevronRight onClick={()=> slide(500)} className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-40 hidden group-hover:block cursor-pointer" size={30} />
    </div>



    </div>
    </>
  )
}

export default Profile