
import mongoose from "mongoose";
import dotenv from "dotenv"
//connection establish
dotenv.config()

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;

//listeners
db.on("connected", () => console.log("connected to the db",mongoose.connection.name));
db.on("disconnected", () => console.log("Not connected to the db"));
db.on("error", () => console.log("Error connecting to the db"));


export default db