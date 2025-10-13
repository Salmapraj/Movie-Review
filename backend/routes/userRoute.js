import express, { response } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken, jwtAuthMiddleware } from "../jwt.js";
const router = express.Router();

//code for signup
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body is", req.body);

    //check if the user exists in the db with same email(email: unique)
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ error: "user already exists Login" });

    //hash user password first do npm i bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //document is generated in db
    const user = new User({
      email,
      password: hashedPassword,
    }); //model ko obj

    // save data in database
    const savedData = await user.save();
    console.log("data saved todb");

    //generate jwt token
    const token = generateToken({ email: user.email });
    console.log("token generated: ", token);

    res.status(200).json({ savedData: savedData, token: token });
  } catch (error) {
    res.status(500).json({ error: "data no saved internal server error" });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user
    const user = await User.findOne({ email });
    console.log("From db found", user);
    const PasswordMatch = await bcrypt.compare(password, user.password); //return true or false
    if (!PasswordMatch || !user.email)
      return res.status(401).json({ error: "invalid  email or password" });

    //token generate
    const token = generateToken({ email: user.email });
    res.status(200).json({user,token });
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

//profile with middleware protectedroute
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const { email } = req.userPayload;
    //find user
    const user = await User.findOne({ email }).select("-password");
    console.log("From db found", user);
    if (!user) {
      return res.send(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



//logout route




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
