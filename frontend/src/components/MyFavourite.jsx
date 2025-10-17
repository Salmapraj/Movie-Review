import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/";

function Favourite() {
  const { token, isAuthenticated } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavourites = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}get-favourite`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched favourites:", res.data);
        setFavourites(res.data || []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [isAuthenticated, token]);

  if (loading)
    return <p className="text-gray-400 p-6">Loading favourites...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Favourties</h2>

      {favourites.length === 0 ? (
        <p className="text-gray-400">No favourite movies yet.</p>
      ) : (
        <div className="space-y-4">
          {favourites.map((fav) => (
            <div
              key={fav._id}
              className="bg-[#1f2937] border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div
                  onClick={() => {
                    navigate(`/movies/${fav.movieId}`);
                  }}
                >
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {fav.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Movie ID:{" "}
                    <span className="text-gray-300">{fav.movieId}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
