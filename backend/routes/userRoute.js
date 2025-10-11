import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import {generateToken} from "../jwt.js"
const router = express.Router();

//code for signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('body is',req.body);

    //check if the user exists in the db with same email(email: unique)
    const existUser = await User.findOne({email});
    if(existUser) return res.status(400).json({ error: "user already exists Login" });

    //hash user password first do npm i bcrypt
    const saltRounds=10
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    //document is generated in db
    const user = new User({
      username,
      email,
      password: hashedPassword,
    }); //model ko obj

    // save data in database
    const savedData = await user.save();
    console.log("data saved todb");
    
    //generate jwt token
    const token = generateToken({email: user.email})
    console.log('token generated: ',token)

    res.status(200).json({savedData: savedData , token :token});
  } catch (error) {
    res.status(500).json({ error: "data no saved internal server error" });
  }
});


//login route
router.post("/login",async(req,res)=>{
try {
    const {email,password}= req.body   
    //find user 
const userInfo= await User.findOne({email})
console.log('From db found',userInfo)
const PasswordMatch = bcrypt.compare(password,userInfo.password) //return true or false
if(!PasswordMatch || !userInfo.email) return res.status(401).json({error:'invalid  email or password'})

    //token generate
    const token= generateToken({email:userInfo.email})
    res.status(200).json({token})
} catch (error) {
    console.log(error.response)
    res.status(500).json({error:'internal server error'})
}

})


router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});



//profile with middleware
router.get('/profile', (req,res)=>{
res.status(200)
})




// router.get("/users/:id", async (req, res) => {
//   try {
//     const idData = req.params.id;
//     const dat = await User.find({ id: idData });
//     res.status(200).json(dat);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// });

// router.put("/users/:id", async (req, res) => {
//   try {
//     await User.find({});
//   } catch (error) {}
// });

export default router;
