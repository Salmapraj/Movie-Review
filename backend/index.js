import express from 'express';
import db from './db.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv"

const app=express();
const PORT = process.env.PORT || 3000; // fallback if not set

app.use(bodyParser.urlencoded({extended : true}))
dotenv.config()

app.get("/",(req,res)=>{
    res.send("helllo world")
})

//movies api call 
import tmdbRouter from './routes/apiCall.js';
import userRouter from './routes/userRoute.js'; //import router frim useRouter

app.use('/',tmdbRouter)
app.use('/',userRouter) //use router


app.listen(PORT,()=>{
    console.log('server running on port 3000')
}); 