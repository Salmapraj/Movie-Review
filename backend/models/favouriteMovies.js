import express from "express"
import mongoose from "mongoose"

const favouriteSchema = new mongoose.Schema({
userId :{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
movieId: {type:String, required: true},
title: {type:String, required: true},
createdAt : {type: Date, default: Date.now}

})
const Favourite = mongoose.model('Favourite',favouriteSchema)
export default Favourite;