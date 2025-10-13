import { createContext,useContext, useEffect, useState } from "react";
import { register } from "../api/register";
export const AuthContext = createContext();

export const AuthProvider =({children})=>{

const [user,setUser]= useState(null) //user info
const [isAuthenticated,setIsAuthenticated]= useState(false)
const [token,setToken]= useState(null)
const [loading, setLoading] =  useState(true)


useEffect(()=>{
const storedUser= localStorage.getItem('user');
const storedToken = localStorage.getItem('token')

if(storedUser && storedToken){
    axios.get('http://localhost:3000/api/profile',{
        headers:{
            authorization : `Bearer ${storedToken}`
        }
    }).then((res)=>{
        setUser(res.data.user)
        setToken(storedToken)
        setIsAuthenticated(true)
    }).catch(()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    })
    .finally(()=> setLoading(false))
}else setLoading(false)
},[])

return (
    <AuthProvider.Provider value={{user,isAuthenticated,token, loading}}>
        {children}
    </AuthProvider.Provider>
)
}