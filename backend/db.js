
import mongoose from "mongoose";

//connection establish
const mongoURL = "mongodb://localhost:27017/users";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;

//listeners
db.on("connected", () => console.log("connected to the db"));
db.on("disconnected", () => console.log("Not connected to the db"));
db.on("error", () => console.log("Error connecting to the db"));


export default db