import mongoose from "mongoose";


//schema
const userSchema= new mongoose.Schema({
    username: {type: String, required: true},
    email : {type: String, required : true, unique:true},
    password :{type : String, required : true},
    id:{type: Number, required: true}
})
// 

//define model for interaction
const User = mongoose.model('User',userSchema)
export default User