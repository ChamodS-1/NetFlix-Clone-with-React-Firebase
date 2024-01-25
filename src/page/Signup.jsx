import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext';

const Signup = () => {

const [rememberlogin , setRememberLogin] = useState(true);
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');


const {user , signUp} = UserAuth();
const navigate = useNavigate();

const handleFunction = async (e) => {
  e.preventDefault();
  
  try{
    await signUp(email,password);
    navigate('/')
  }catch(e){
    console.log(e);
  }

}

  return (
    <>
    <div className="w-full h-screen">
      <img className="hidden sm:block absolute w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/050d249e-619a-4fbb-90c0-1a0c4ce1d7b8/LK-en-20240115-trifectadaily-perspective_alpha_website_small.jpg" alt="" />
      <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

      <div className="fixed w-full z-20 px-4 py-24">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-nsans-bold">Sign Up</h1>
            <form onSubmit={handleFunction} action="" className="w-ful flex flex-col py-4">
              <input className="p-3 my-2 bg-gray-200 rounded-md text-black" type="email" placeholder='email' autoComplete='email' value={email} onChange={(e)=> setEmail(e.target.value) }/>
              <input className="p-3 my-2 bg-gray-200 rounded-md text-black" type="password" placeholder='password' autoComplete='current-password' value={password} onChange={(e)=> setPassword(e.target.value) }/>

              <button className="bg-red-600 my-6 py-3 rounded-md hover:bg-red-700">Sign Up</button>

              <div className="flex justify-between items-center text-gray-600"> 
                <p>
                  <input type="checkbox" className="mr-2 " checked={rememberlogin}  onChange={(e)=> setRememberLogin(!rememberlogin)}/>
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>

              <p className="my-4">
                <span className="text-gray-600 mr-4">Already Subscribe to Netflix</span>
                <Link to={'/login'}> Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup