import express from "express"
import User from "../models/user.js"
const router = express.Router();

router.post("/register",async (req,res)=>{
try {
const data = req.body
console.log(data)
//document is generated in db
const user = new User(data); //model ko obj
// save data in database
 const savedData= await user.save()
 console.log('data saved todb')
 res.status(200).json(savedData)
    
} catch (error) {
    res.status(500).json({error: 'internal server error'})
}
})

router.get('/users', async(req,res)=>{

try {
    const data = await User.find()
    res.status(200).json(data)
   
} catch (error) {
res.status(500).json({error:"Error fetching data"})
}

})


router.get("/users/:id", async(req,res)=>{
    try {

        const idData= req.params.id
      const dat=  await User.find({id: idData})
          res.status(200).json(dat)

    } catch (error) {
        res.status(500).json({error:"Error fetching data"})

    }
})


router.put('/users/:id',async (req,res)=>{

try {
    await User.find({})


} catch (error) {
    
}



})









export default router;