import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // frontend URL
    credentials: true, // if you use cookies or auth headers
  })
);

dotenv.config();

const PORT = process.env.PORT || 3000; // fallback if not set

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

//movies api call
import tmdbRouter from "./routes/apiCall.js";
import userRouter from "./routes/userRoute.js"; //import router frim useRouter
import movieRouter from "./routes/movieApi.js";
import routerReview from "./routes/review.js";
import myReview from "./routes/myreview.js";
import favRouter from "./routes/myFavourite.js";

app.use("/api", tmdbRouter);
app.use("/api", userRouter); //use router
app.use("/api", movieRouter);
app.use("/api", routerReview);
app.use("/api", myReview);
app.use("/api", favRouter);

//  Catch-all route (MUST be AFTER API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("server running on port 3000");
});
