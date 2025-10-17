import React from "react";
import { useNavigate } from "react-router-dom";
import FavouriteMovie from "./FavouriteMovie";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBA";

  return (
    <div
      className="movie-card cursor-pointer bg-gray-600 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="relative">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="absolute top-2 right-2 z-10">
          <FavouriteMovie title={movie.title} movieId={movie.id} />
        </div>
      </div>

      <div className="px-3 py-1">
        <h2 className="text-xl font-bold mb-3">{movie.title}</h2>
        <p className="text-lg">{releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;
