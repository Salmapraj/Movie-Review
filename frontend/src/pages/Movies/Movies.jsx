import React from 'react'
import { useMovies } from '../../context/MovieContext'
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';

function Movies() {
const {movies,loading,error,searchResults,setSearchResults, page,setPage}= useMovies();
const displayedMovies = searchResults.length>0? searchResults:movies
 

return (
    <>
    <div className='min-h-screen bg-gray-900 p-8 text-white'>
      <SearchBar/>
        <div className='flex  justify-between'> 
      <h3 className="text-4xl font-bold mb-12">
        {searchResults.length>0 ?"Search Results:": "Popular Movies"}
         </h3>
           <h1 onClick={()=>
          setSearchResults([])
           } className="text-xl font-bold mb-12 cursor-pointer">
        {searchResults.length>0 && "Back"}
         </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 space-y-5">
{error &&<p>{error}</p>}
{loading? <p>Loading...</p>: 
  (displayedMovies.slice(0,18).map((movie)=>(
      <MovieCard  key={movie.id}  movie={movie}/>
  )))
  }
          </div>
          <div className='flex justify-between mt-5'>
       <button disabled={page===1 } onClick={()=>setPage((prev)=>Math.max(prev-1,1))}  className='text-lg bg-gray-600 p-2 cursor-pointer rounded hover:bg-gray-800'>Previous Page</button>
       <button onClick={()=>setPage((prev)=> prev+1)} className=' bg-gray-600 p-2 text-lg rounded cursor-pointer rounded hover:bg-gray-800'>Next Page</button>
          </div>
        </div>
      </>
  )
}

export default Movies