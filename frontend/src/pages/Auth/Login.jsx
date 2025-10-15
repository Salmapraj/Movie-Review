import React, { useState } from 'react'
// import { login } from '../../api/login';
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom"



function Login() {
const [email,setEmail] =useState('')
const [password,setPassword]= useState('')
  const [error,setError]=useState('')
const {login}= useAuth()
const navigate= useNavigate();


const HandleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const PostData = {
      email,
      password,
    };
    try {
      const data = await login(PostData);
      console.log("user registerd", data);
      setEmail("");
      setPassword("")
      navigate('/')
      alert("login sucessful")
    } catch (error) {
      console.log( error.message|| 'login failed');
      alert('Invalid email or password')
    }
  };
  return (
    <div className=' '>
<div className='flex flex-col justify-center items-center min-h-screen' >
      <h2 className='font-bold text-3xl  mb-3'>Welcome to </h2><h2 className='font-bold text-3xl mb-5'>MovieChatter</h2>
      
 <form
    action="/submit" onSubmit={HandleSubmit }
    className="flex flex-col gap-6 border border-gray-500 rounded-4xl p-6 w-80 mb-8"
  >
      <label htmlFor=""  className=''>Email</label>
      <input type="text" placeholder='Email' className='py-2 px-1 border border-gray-500 rounded-lg' value={email} onChange={(e)=>setEmail(e.target.value)}/>

      <label htmlFor="">Password</label>
      <input type="password" placeholder='Password' className='py-2 px-1 border border-gray-500 rounded-lg' value={password} onChange={(e)=>{ 
        const value =e.target.value
        setPassword(value)
        if(value.length <5) { setError('Password must  be atleast 5 characters.')} 
        else setError("")
      }}/>
      
   <button
      type="submit"
      className="py-2 px-3 text-center border border-gray-500 rounded-lg"
    >
      Login
    </button>
 </form>
    <h2 className='font-semibold text-2xl mb-5'>OR</h2>
  <button
      className="py-2 px-3 w-65 border border-gray-500 rounded-lg">
      Sign in with Google
    </button>
</div>
    </div>
  )
}

export default Login