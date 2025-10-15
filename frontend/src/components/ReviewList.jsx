import React from 'react'

function ReviewList({reviews=[]}) {

  return (
        <div className="space-y-3">
      {reviews.length > 0 ? (
        reviews.map((rev, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">{rev.author}</p>
              <p className="text-xs text-gray-500">{rev.source}</p>
            </div>
            <p className="text-gray-700 mt-2">{rev.content}</p>
            {rev.rating && (
              <p className="text-yellow-600 mt-1 text-sm">Rating: {rev.rating}/10</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {new Date(rev.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      )}
    
    </div>
  )
}

export default ReviewList