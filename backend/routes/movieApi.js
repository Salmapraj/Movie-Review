import express from 'express'
import axios from "axios"
import dotenv from "dotenv"


const movieRouter =express.Router()
dotenv.config()

const bearerToken = process.env.TMDB_BEARER_TOKEN;
const baseUrl = "https://api.themoviedb.org/3/";


//get Movie casts
movieRouter.get('/movie/:id/credits', async(req,res)=>{
    try {
        const movieId=req.params.id;
        console.log("movieId:", req.params.id);

        if(!movieId) return res.status(400).json({error:"MovieId is not set."})

         if (!bearerToken) {
      return res.status(500).json({ error: "TMDB Bearer Token is not set" });
    }


    const response =await axios.get(`${baseUrl}movie/${movieId}/credits`,{
        headers:{
            Authorization : `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'

        }
    })
    res.status(200).json(response.data)
    } catch (error) {
            res.status(500).json({ error: error.message});
            console.error(error.response?.data || error.message);

   }
})



export default movieRouter