import express from 'express';
import db from './db.js';
import User from './models/user.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv"


const app=express();
const PORT = process.env.PORT || 5000; // fallback if not set

app.use(bodyParser.urlencoded({extended : true}))
dotenv.config()

app.get("/",(req,res)=>{
    res.send("helllo world")
})

// app.post("/register",(req,res)=>{

    
//     res.sendStatus(200)
// })

app.listen(PORT,()=>{
    console.log('server running on port 3000')
});