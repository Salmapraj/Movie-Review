import axios from "axios";
const API_URL = "http://localhost:3000/api"; // full backend URL


//register api call

export const register =async(postData)=>{
try {
   const res= await axios.post(`${API_URL}/register`,postData,
{
    headers:{
        'Content-Type': 'application/json'
    }
}
)
const userInfo = res.data
console.log(res.data)
// return res.data;
localStorage.setItem("user", JSON.stringify(userInfo.savedData))

} catch (error) {
    console.log('error registering user',error.message)
    throw error
}
}
