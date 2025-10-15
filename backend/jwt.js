import jwt from 'jsonwebtoken'


//middleware for veriying jwt token
const jwtAuthMiddleware=(req,res,next)=>{
//extract the token from request header
const token = req.headers.authorization.split(' ')[1] // {authorization : }
if(!token) return res.status(401).json({error:'unauthorized'})
try {
    
  const decode=  jwt.verify(token,process.env.JWT_SECRET_KEY)  //return payload after decodin
 req.userPayload = decode//Attach the decoded user data to the current request object
next()

} catch (error) {
console.log(error.message)
    res.status(401).json({ error: 'Invalid token' });
}
}
 


//function to generate token
const generateToken =(payload)=>{
    try {
    console.log("JWT secret:", process.env.JWT_SECRET_KEY);

        return  jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"94h"})
        
    } catch (error) {
        console.error("Error generating token:", error);
    return null;
    }
}






export {jwtAuthMiddleware, generateToken}