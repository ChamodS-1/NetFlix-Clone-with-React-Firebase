import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext'

const Navbar = () => {

const {user , logOut} = UserAuth();
const navigate = useNavigate();

const handlelogOut =  async () => {
    try{
        await logOut();
        navigate('/')
    }catch(e) {
        console.log(e);
    }
}


  return (
    <div className="absolute flex justify-between items-center p-4 z-50 w-full">
        <Link to='/'>
            <h1 className="uppercase text-3xl md:text-4xl text-red-600 font-nsans-bold cursor-pointer">netflix</h1>
        </Link>


        {

            user?.email ? (

                <div>
                <Link to='/profile'>
                    <button className="capitalize pr-4 hover:scale-105 duration-200">profile</button>
                </Link>
    
                
            <button onClick={handlelogOut} className="capitalize bg-red-600 px-6 py-2 rounded-md cursor-pointer hover:scale-105 duration-200">logout</button>
                
            </div>

            ) :
            
            (
        
        <div>
        <Link to='/login'>
            <button className="capitalize pr-4 hover:scale-105 duration-200">login</button>
        </Link>

        <Link to='/signup'>
            <button className="capitalize bg-red-600 px-6 py-2 rounded-md cursor-pointer hover:scale-105 duration-200">signup</button>
        </Link>
        </div>

            )

        }



    </div>
    
  )
}

export default Navbar