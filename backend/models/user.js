import mongoose from "mongoose";


//schema
const userSchema= new mongoose.Schema({
    email : {type: String, required : true, unique:true},
    password :{type : String, required : true},
    
})
// 

//define model for interaction
const User = mongoose.model('User',userSchema)
export default User