import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
      <p className="text-gray-300 mb-5">{movie.overview}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Cast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {casts.slice(0, 10).map((cast) => (
          <div key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt={cast.name}
              className="rounded-xl"
            />
            <p className="text-center text-sm mt-1">{cast.name}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((rev, i) => (
          <div key={i} className="mb-3 bg-gray-800 p-3 rounded-xl">
            <p className="text-lg">{rev.content || rev.review}</p>
            <p className="text-sm text-gray-400 mt-2">- {rev.author || rev.userId?.email}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}


