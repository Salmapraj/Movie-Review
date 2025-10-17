import React from 'react'
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons from lucide-react
import { useNavigate } from 'react-router-dom';


function Carousel({movies}) {
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
const navigate = useNavigate();
    const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow:<NextArrow/>,
  prevArrow:<PrevArrow/>
};

function NextArrow({onClick}){
return(
    <div onClick={onClick}  className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 
                 bg-black/50 hover:bg-black/70 rounded-full p-3 cursor-pointer">
        <ChevronRight size={28} color='white'/>
    </div>
)
}

function PrevArrow({onClick}){
    return(
        <div onClick={onClick}  className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 
                 bg-black/50 hover:bg-black/70 rounded-full p-3 cursor-pointer">
<ChevronLeft size={28} color='white'/>
        </div>
    )
}

  return(
    <div className='relative mb-10  cursor-pointer' 
   
    >
        <Slider {...settings}>
        {movies.slice(0,8).map((mov)=>( 

            <div key={mov.id} className='relative'>
                    <img src={`${baseImgUrl}${mov.backdrop_path}`} alt={mov.title}  
                    
                      className="w-full h-[700px] object-cover rounded shadow-lg inset-0 bg-black/70"
/>
<div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 rounded-2xl" 
                     onClick={()=>{
      navigate(`/movies/${mov.id}`)}}>
  <h2 className="text-3xl  lg:text-5xl font-bold text-white mb-2">{mov.title}</h2>
  <p className=" text-sm text-gray-200 lg:text-lg max-w-2xl">{mov.overview.slice(0, 120)}...</p>
</div>
 
            </div>
        ))}
        </Slider>
    </div>
  )
}
export default Carousel



