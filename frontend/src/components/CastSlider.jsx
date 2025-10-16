import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons from lucide-react

function CastSlider({ casts }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Movie Cast</h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Scrollable Cast List */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide scroll-smooth"
      >
        {casts.map((cast) => (
          <div
            key={cast.id}
            className="flex-none w-40 bg-gray-300 rounded-2xl shadow-md p-2 hover:scale-105 transition-transform duration-200"
          >
            <img
              src={
               `https://image.tmdb.org/t/p/w300${cast.profile_path}`
            }
              alt={cast.name}
              className="rounded-2xl object-cover w-full h-56"
            />
            <div className="mt-2 text-center">
              <p className="font-semibold text-gray-800 truncate">
                {cast.name}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {cast.character}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default CastSlider;
