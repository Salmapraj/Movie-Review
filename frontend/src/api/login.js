import axios from "axios"
const API_URL = "http://localhost:3000/api/"



export const login =async(PostData)=>{
try {
    
const response =await axios.post(`${API_URL}login`, PostData,
    {
        headers:{
            'Content-Type':'application/json'
        }
    })
    console.log(response.data)
    const data =response.data
    return data
// localStorage.setItem("user",JSON.stringify(user))
} catch (error) {
    alert('Invalid Email or password')
    console.log('errorlogging in',error.message)
}


}