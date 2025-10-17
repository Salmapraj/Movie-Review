import { createContext,useContext, useEffect, useState } from "react";
import { register } from "../api/register";
import { login } from "../api/login";
import axios from "axios";

export const AuthContext = createContext();

export  const AuthProvider =({children})=>{

const [user,setUser]= useState(null) //user info
const [isAuthenticated,setIsAuthenticated]= useState(false)
const [token,setToken]= useState(null)
const [loading, setLoading] =  useState(true)

//on reload check saved daata from localstorage 
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
    setToken(storedToken);
    setIsAuthenticated(true);
  }
  setLoading(false);
}, []);


//login function
const loginUser  = async(PostData)=>{
    try {
        
        const res =await login(PostData)
        const{user, token}= res
        setUser(user)
        setToken(token)
        setIsAuthenticated(true)
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',(token))
    } catch (error) {
        throw error;
    }
}


//register
const registerUser = async (postData) => {
  try {
    const res = await register(postData);
    const { savedData, token } = res;

    setUser(savedData);
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(savedData));
    localStorage.setItem("token", token);

    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Registration failed");
    }
  }
};



  //logout
   const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

return (
    <AuthContext.Provider value={{user,
    isAuthenticated,
    token,register:registerUser,
    login:loginUser, 
    loading,
    logout}}>
        {children}
    </AuthContext.Provider>
)
}

export function useAuth(){
    const context= useContext(AuthContext)
    if(!context) throw new Error('userAuth must be used within AuthProvider')
        return context;
}