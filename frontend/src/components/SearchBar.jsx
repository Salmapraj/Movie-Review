import React from 'react'
import { useState } from 'react'
import {useMovies} from "./../context/MovieContext"

function SearchBar() {
const [mov,setMov]= useState("")
const {SearchMovies}= useMovies();

const HandleSubmit =async(e)=>{
e.preventDefault();
if(!mov.trim()) return;
try {
 await SearchMovies(mov)

} catch (error) {
  console.log('error searching for movies',mov);
}

}

  return (
    <div className='flex items-center justify-center p-4' >
<form action="/submit"          onSubmit={HandleSubmit}
 className="flex items-center w-full lg:w-1/2">
        <input
          type="text" value={mov} onChange={(e)=>setMov(e.target.value)}
          placeholder="Search for a movie"
          className="border px-6 py-3 w-full text-xl rounded-l-4xl border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-teal-500 text-xl text-white px-6 py-3 rounded-r-4xl hover:bg-teal-600"
        >
          Search
        </button>
      </form>
    </div>
      
  )
}

export default SearchBar