import express from "express";
import axios from 'axios';
import { jwtAuthMiddleware } from "../jwt.js";
import Review from "../models/reviewsModel.js";
import dotenv from "dotenv";


const bearerToken = process.env.TMDB_BEARER_TOKEN;
const baseUrl = "https://api.themoviedb.org/3/";
dotenv.config();
const routerReview = express.Router();
//get reviews
routerReview.get("/movie/:id/reviews", async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!movieId) return res.status(400).json({ error: "MovieId is required" });
    if (!bearerToken) res.status(500).json({ error: "Beaerer Token is Empty" });

    const [tmdbResponse, localReview] = await Promise.all([
      axios.get(`${baseUrl}/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }),
      Review.find({ movieId }).populate("userId", "email"),
    ]);

    //normalize localreview to match with tmdb reviews
    const formattedLocal = (localReview || []).map((rev) => ({
  author: rev.userId?.email || rev.email || "Anonymous",
  rating: rev.rating || null,
  content: rev.review,
  createdAt: rev.createdAt,
  source: "Local",
}));

//normalize tmdbreviews
const formattedTmdb = (tmdbResponse.data.results || []).map((rev) => ({
  author: rev.author,
  rating: rev.author_details?.rating || null,
  content: rev.content,
  createdAt: rev.created_at,
  source: "TMDB",
}));

    const combinedReviews = [...formattedLocal, ...formattedTmdb ].sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

    res.status(200).json(combinedReviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch combined reviews" });
  }
});

//post review to mongodb
routerReview.post("/movie/reviews", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.userPayload;
    console.log(req.userPayload)
    const { review, movieId, rating } = req.body;
    if (!movieId || !review || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const reviewData = new Review({
      movieId,
      review,
      rating,
      userId:id,
    });

    const savedData = await reviewData.save();
    console.log("data saved todb", savedData);
    res.status(200).json(savedData);
  } catch (error) {
    console.error("Error saving review:", error.message);
    res.status(500).json({ error: error.message || "Failed to save review" });
  }
});

export default routerReview;
