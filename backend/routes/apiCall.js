import express from "express";
import axios from "axios";
import {jwtAuthMiddleware} from "../jwt.js";
import dotenv from "dotenv"

const tmdbRouter = express.Router();
dotenv.config()


const bearerToken = process.env.TMDB_BEARER_TOKEN;
const baseUrl = "https://api.themoviedb.org/3/";


//get popular movies
tmdbRouter.get("/movies", async (req, res) => {
  try {
    const page=req.query.page || 1;
console.log("Fetching popular movies, page:", page);


    if (!bearerToken) {
      return res.status(500).json({ error: "TMDB Bearer Token is not set" });
    }
    const response = await axios.get(`${baseUrl}movie/popular`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      params:{page},
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

//search for movies
tmdbRouter.get("/search", async (req, res) => {
  try {
    const movieTitle = req.query.query; //extract name from url
    if (!movieTitle) return res.status(400).json({ error: "query paramater is required." });
    console.log(movieTitle);

    if (!bearerToken) {
      return res.status(500).json({ error: "TMDB Bearer Token is not set" });
    }

    const response = await axios.get(`${baseUrl}search/movie`, {
      headers:{
        Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
      
      },
      params: {
        query: movieTitle
    }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response });
  }
});

//get movie details
tmdbRouter.get("/movies/:id",async(req,res)=>{
  try {
    const movieId = req.params.id;
      if (!bearerToken) {
      return res.status(500).json({ error: "TMDB Bearer Token is not set" });
    }

    const response =await axios.get(`${baseUrl}movie/${movieId}`,
      {
        headers:{
          Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
        }
      }
    )
    res.status(200).json(response.data)
  
  } catch (error) {
    res.status(400).json({error:'failed to fetch movie details'})
  }
})

export default tmdbRouter;
