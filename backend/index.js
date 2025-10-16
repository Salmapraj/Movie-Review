import express from 'express';
import db from './db.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from "cors"


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // if you use cookies or auth headers
}));

const PORT = process.env.PORT || 3000; // fallback if not set

dotenv.config()

app.get("/",(req,res)=>{
    res.send("helllo world")
})
app.get("/getData",(req,res)=>{
    res.send("helllo world")
})

//movies api call 
import tmdbRouter from './routes/apiCall.js';
import userRouter from './routes/userRoute.js'; //import router frim useRouter
import movieRouter from './routes/movieApi.js';
import routerReview from './routes/review.js';
import myReview from './routes/myreview.js';

app.use('/api',tmdbRouter)
app.use('/api',userRouter) //use router
app.use('/api',movieRouter)
app.use('/api',routerReview)
app.use('/api',myReview)









app.listen(PORT,()=>{
    console.log('server running on port 3000')
}); 