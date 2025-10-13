import React from 'react'
import { useMovies } from '../../context/MovieContext'
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
function Movies() {
const {movies,loading,error,searchResults}= useMovies();
  
const displayedMovies = searchResults.length>0? searchResults:movies
  return (
    <>
    <div className='min-h-screen bg-gray-900 p-8 text-white'>
      <SearchBar/>
      <h1 className="text-4xl font-bold mb-12">
        {searchResults.length>0 ?"Search Results:": "Popular Movies"}
         </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 space-y-5">
{error &&<p>{error}</p>}
{loading? <p>Loading...</p>: 
  (displayedMovies.map((movie)=>(
      <MovieCard  key={movie.id}  movie={movie}/>
  )))
  }
        </div>
       
       
       </div></>
  )
}

export default Movies