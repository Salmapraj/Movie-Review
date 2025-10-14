import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
movieId :{type : String, required: true},
rating : {type: Number, required:true},
review :{type:String, required: true},
createdAt:{type:Date, default:Date.now},
userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}
})
reviewSchema.index({ movieId: 1, userId: 1 }, { unique: true });

const Review=mongoose.model('Review',reviewSchema)
export default Review;