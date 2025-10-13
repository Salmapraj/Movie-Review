import React from 'react'
import Login from '../Auth/Login'
import SearchBar from '../../components/SearchBar'
import MovieCard from "../../components/MovieCard"
import { useMovies } from '../../context/MovieContext'

function Home() {
const {movies,searchResults,loading ,error}=useMovies()
  const displayedMovies = searchResults?.length > 0 ? searchResults : movies;

  return (
    <div>
      {/* <Login/> */}
      {/* search bar section */}
      <div className='p-6'>
      <SearchBar/>
      </div>
{/* //Movie section */}
      <div className='bg-gray-900'>
        <h1 className="text-4xl text-white font-bold mb-12">
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
       
      </div>
    </div>
  )
}

export default Home