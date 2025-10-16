import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StarRating';
import CastSlider from '../../components/CastSlider';
import ReviewList from '../../components/ReviewList';
import WriteReview from '../../components/WriteReview';

 export default function Detail() {
const API_URL = "http://localhost:3000/api/"; // full backend URL

const {id}=useParams();
const [casts,setCasts]= useState([])
const [reviews, setReviews]=useState([])
const [movie,setMovie]=useState(null) // only one movie is send from api so put null
const [loading,setLoading]= useState(true)
const [error,setError]= useState(null)

useEffect(()=>{
//fetch detail, movie reviews and casts
       const fetchAll =async()=>{
        try {
            const [movieRes,castsRes,reviewsRes]= await Promise.all([
                axios.get(`${API_URL}movies/${id}`), //detail
                axios.get(`${API_URL}movie/${id}/credits`), //credits
                axios.get(`${API_URL}movie/${id}/reviews`) //reviews
            ])

            setMovie(movieRes.data);
            console.log(movie)
            setCasts(castsRes.data.cast|| []);
            console.log(casts)
            setReviews(reviewsRes.data || []);
            console.log(reviews)
        } catch (error) { 
            setError("Failed to load movie data");
        }finally{
            setLoading(false)
        }
    }
    fetchAll()
},[id])

        if(loading)return<p> Loading...</p>
         if (error) return <p className="text-red-500 p-8">{error}</p>;
        if (!movie) return <p className="text-white p-8">No movie found.</p>;
        const releaseDate=(movie.release_date).split('-')[0];
        const limitedReviews= reviews.slice(0,2);
      
  return (
    <>
    <div className="relative w-full h-[70vh] overflow-hidden ">
  <img
    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
    alt={movie.title}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay for darkening effect */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content on top */}
  <div className="relative z-10 flex items-center h-full px-16">
     {/* Movie Poster */}
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={movie.title}
      className="w-60 mr-16 rounded-2xl shadow-2xl rounded-lg lg:w-100 md:w-80"
    />
    <div className="max-w-xl text-white space-y-4">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl">{movie.title} <span className='text-3xl'>({releaseDate})</span></h1>
      <p className="text-sm opacity-90 md:text-sm lg:text-lg ">{movie.overview}</p>
      
      <div className="flex flex-wrap gap-2 text-sm opacity-90 md:text-sm lg:text-lg ">
  {movie.genres.map((gen) => (
    <p key={gen.id} className="px-1 py-1 text-sm opacity-90 md:text-sm lg:text-lg ">
      {gen.name} |
    </p>
  ))}
</div>

    <StarRating rating={movie.vote_average}/>

    </div>
  </div>

  
</div>
<div className='p-4 bg-gray-900 text-white'>
 <CastSlider casts={casts}/>

 {/* reviews */}
<hr className='my-5'/>
      <h1 className='text-3xl font-bold mb-5'>Reviews</h1>
        <ReviewList reviews={limitedReviews}/>
      
</div>

<WriteReview movieId={id}   onReviewAdded={(newReview) => setReviews((prev) => [newReview, ...prev])} />


    </>


  )
}


