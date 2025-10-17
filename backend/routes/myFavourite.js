import express from "express";
import axios from "axios";
import { jwtAuthMiddleware } from "../jwt.js";
import Favourite from "../models/favouriteMovies.js";

const favRouter = express.Router();

//get fav
favRouter.get("/get-favourite", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.userPayload;
    if (!id) return res.status(400).json({ error: "Invalid user Id." });

    const movies = await Favourite.find({ userId: id });
    res.status(200).json(movies);
    console.log("favourite  movie saved", movies);

  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "failed to get favourite movie" });
  }
});

//get Specific favourite
favRouter.get('/favourite/:movieId',jwtAuthMiddleware,async(req,res)=>{
  try {
    const {id}=req.userPayload
    const {movieId}= req.params
const exists=await Favourite.findOne({userId:id, movieId})
    res.status(200).json({ isFavourite: !!exists });

  } catch (error) {
    
  }
})


// post fav movie
favRouter.post("/favourite", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.userPayload;
    const { movieId, title } = req.body;
    if (!id) return res.status(400).json({ error: "Invalid user Id." });
    if (!movieId || !title) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exists = await Favourite.findOne({ userId: id, movieId });
    if (exists)
      return res.status(400).json({ message: "Movie already in favorites" });
    const favMovie = new Favourite({
      movieId,
      userId: id,
      title,
    });
    const favData = await favMovie.save();
    res.status(200).json(favData);
    console.log("favourite  movie saved", favData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to saved favourite movie" });
  }
});

//remove fav movie
favRouter.delete("/favourite/:movieId", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.userPayload;
    const { movieId } = req.params;
    if (!movieId) return res.status(400).json({ error: "Invalid user Id." });

     await Favourite.findOneAndDelete({userId:id,movieId});
        res.status(200).json({ message: "Removed from favorites" });

  } catch (error) {
        res.status(500).json({ error: "Failed to remove favorite" });

  }
});

export default favRouter;
