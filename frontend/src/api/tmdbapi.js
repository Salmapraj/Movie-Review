import axios from 'axios'


const API_URL = "http://localhost:3000/api/"

//get all movies
export const getMovies=async()=>{
try {
   const response= await axios.get(`${API_URL}movies`)
console.log(response.data)

} catch (error) {
    
}
}