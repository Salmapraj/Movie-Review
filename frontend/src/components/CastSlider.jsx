import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Arrow components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md z-10 cursor-pointer"
    >
      <ChevronRight size={24} />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md z-10 cursor-pointer"
    >
      <ChevronLeft size={24} />
    </div>
  );
}

function CastSlider({ casts = [] }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="relative w-full px-6">
      <h2 className="text-2xl font-bold mb-4">Movie Cast</h2>

      <Slider {...settings}>
        {casts.map((cast) => (
          <div key={cast.id} className="px-2">
            <div className="bg-gray-300 rounded-2xl shadow-md p-2 hover:scale-105 transition-transform duration-200">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
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
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CastSlider;
