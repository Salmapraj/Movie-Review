import React from 'react'
import {Star,StarHalf,StarOff} from'lucide-react'

function StarRating({rating}) {

const stars=Math.round(rating/2)  //for 5 stars instead of 10 of tmdb
  return (
    <div className="flex items-center space-x-1">
    {Array.from({ length: 5 }, (_, i) => {
        if (i < stars) return <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />;
        return <StarOff key={i} className="text-gray-500" size={20} />;
      })}
          <span className="ml-2 text-gray-300 text-sm">{rating.toFixed(1)} / 10</span>

    </div>
  )
}

export default StarRating