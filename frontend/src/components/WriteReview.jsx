import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:3000/api/";
function WriteReview({movieId,onReviewAdded}) {
 
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();
  const navigate =useNavigate()

  const HandleSubmit= async(e)=>{
    e.preventDefault();

    if(!isAuthenticated){ alert("You must be logged in to post a review")
navigate('/login')
      return;
    }

    if(!content.trim() || !rating){alert('Review and Ratings should not be empty.')
      return
    }

  try {
    //apicall for review
    setLoading(true)
    setError(null)
    
  const res=  await axios.post(`${API_URL}movie/reviews`,
      {movieId,
        review:content,
         rating},
      {
          headers:{
            authorization:`Bearer ${token}`
          }
        })
console.log('reviewposted',res.data)
onReviewAdded(res.data)
setContent("")
setRating(0)
    } catch (error) {
      console.log(error)
      setError('failed to postreview')
    }finally{
      setLoading(false)
    }
        
  }

  return (
    <div>
      <form onSubmit={HandleSubmit} className="">
       <div className="flex flex-col"> 
        <label htmlFor="" className="ml-5 my-3"> Write a Review</label>

        <textarea
          name="review"
          id=""
          value={content} required
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-100 p-4 w-1/2 mx-5 rounded-xl shadow-sm border border-gray-200"
        >writea review</textarea></div>
        
        <div>
          <label htmlFor=""className="ml-5">Rating: </label>
        <input
          type="number"
          value={rating}
          min="0"
          max="10" required
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded-md w-24 ml-3 mt-3"
        />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 mb-10 ml-5 mt-5 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default WriteReview;
