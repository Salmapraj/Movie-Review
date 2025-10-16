import React from 'react'
import Login from '../Auth/Login'
import SearchBar from '../../components/SearchBar'
import MovieCard from "../../components/MovieCard"
import { useMovies } from '../../context/MovieContext'
import Carousel from '../../components/Carousel'

function Home() {
const {movies,searchResults,loading ,error}=useMovies()
  const displayedMovies = searchResults?.length > 0 ? searchResults : movies;
  return (
    <div className='bg-gray-900'>

      <div className='p-2 text-white'>
      <SearchBar/>
      </div>
      {/* carousel movie */}
    {movies.length>0 && <Carousel movies={movies}/>} 


{/* //Movie section */}
      <div className='bg-gray-900 p-7 '>
        <h1 className="text-4xl text-white font-bold mb-9">Popular Movies
         </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 space-y-5">
{error &&<p>{error}</p>}
{loading? <p>Loading...</p>: 
  (displayedMovies.slice(0,18).map((movie)=>(
      <MovieCard  key={movie.id}  movie={movie}/>
  )))
  }
        </div>
       
      </div>
    </div>
  )
}

export default Home