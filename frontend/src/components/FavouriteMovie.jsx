import React, { useState,useEffect } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/";

function FavouriteMovie({ title, movieId }) {
  const [fav, setFav] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();


// Check if movie is already in favorites when component loads
  useEffect(() => {
    const checkIfFavourite = async () => {
      if (!isAuthenticated) return; // skip if user not logged in

      try {
        const res = await axios.get(`${API_URL}favourite/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // set fav state based on response
        setFav(res.data.isFavourite);
      } catch (error) {
        console.log("Error checking favorite:", error);
      }
    };
    checkIfFavourite();
  }, [movieId]);

//post fav
  const postFav = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to add favourites");
      navigate("/login");
      return;
    }
    const postData = { movieId, title };
    try {
      const res = await axios.post(`${API_URL}favourite`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Favourite added:", res.data);
      setFav(true);
    } catch (error) {
      console.error("Error adding favourite:", error);
    }
  };

 

//delete fav
 const delFav = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to add favourites");
      navigate("/login");
      return;
    }
    try {
       await axios.delete(`${API_URL}favourite/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Favourite deleted");
      setFav(false);
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

const toggleClick=(e)=>{
e.stopPropagation();
fav ? delFav() :postFav()
}

  return (
    <button
      onClick={toggleClick}
      className="p-2 bg-gray-800/60 rounded-full hover:bg-gray-700 transition"
    >
      <Heart
        size={20}
        className={fav ? "fill-red-500 text-red-500" : "text-white"}
      />
    </button>
  );
}

export default FavouriteMovie;
