import axios from "axios";
const API_URL = "http://localhost:3000/api"; // full backend URL


//register api call

export const register = async (postData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, postData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Backend response:', res.data); // Log the entire response
    return res.data;
  } catch (error) {
    console.log('Error registering user:', error.response?.data, error.message);
    throw error;
  }
};



