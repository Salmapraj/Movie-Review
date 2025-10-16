import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:3000/api/";

function MyReview() {
  const { token } = useAuth();
  const [myReviews, setMyreviews] = useState([]);
  const [error, setError] = useState(null);

  const myReview = async () => {
    try {
      const res = await axios.get(`${API_URL}my-reviews`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      //sort newest first
      const reviews = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setMyreviews(reviews);
      console.log("Fetched reviews:", reviews);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      setError("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    if (token) myReview();
  }, [token]);

  if (!token) {
    return <p className="text-center text-gray-600">Please log in to view your reviews.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
      {error && <p className="text-red-500">{error}</p>}
      {myReviews.length > 0 ? (
        <div className="space-y-4">
          {myReviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <p className="font-semibold text-gray-800">{rev.review}</p>
              <p className="font-semibold text-gray-800">{rev.email}</p>
              <p className="text-yellow-600 text-sm">Rating: {rev.rating}/10</p>
              <p className="text-xs text-gray-500">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !error && <p className="text-gray-500">No reviews found.</p>
      )}
    </div>
  );
}

export default MyReview;
