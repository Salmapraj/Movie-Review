import express from 'express'
import Review from "../models/reviewsModel.js";
import { jwtAuthMiddleware } from '../jwt.js';

const myReview = express.Router()
myReview.get('/my-reviews',jwtAuthMiddleware, async(req,res)=>{
    try {
    
        const {id}= req.userPayload;
    if(!id) return res.status(400).json({error :'Invalid user Id.'})
       
       
        const userReview = await Review.find({userId: id});   
    if (userReview.length === 0) {
      return res.status(200).json({ message: "No reviews found." });
    }
        res.status(200).json(userReview)
        console.log('user review',userReview)
    } catch (error) {
            console.error("Error fetching user reviews:", error);

        res.status(500).json({error:'failed fetching user reviews'})
    }
})
export default myReview;