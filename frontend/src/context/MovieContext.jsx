import axios from "axios";
import { createContext,useContext,useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/"; // full backend URL

export const MovieContext = createContext()
   export const MovieProvider =({children})=>{
    const [movies,setMovies]= useState([]);
    const [loading , setLoading]= useState(true)
    const [error,setError]= useState(null)

    useEffect(()=>{
const fetchMovies =async()=>{try {
    
    const res= await axios.get(`${API_URL}movies`)
        setMovies(res.data.results ||[])//truthy value
        console.log(res.data.results)
} catch (error) {
    setError('failed to load movies')
    console.log(error.message)
}
finally{
    // finally block always executes, no matter what happens
    setLoading(false)

}
}
fetchMovies()
    },[])


return(
    <MovieContext.Provider value={{movies,loading,error}}>
        {children}
    </MovieContext.Provider>
)
}
export function useMovies(){
    const context = useContext(MovieContext)
     if(!context) throw new Error('userAuth must be used within AuthProvider')
        return context;
}

