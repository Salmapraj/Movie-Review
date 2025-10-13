import React from "react";
// import { register } from "../../api/register";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  const navigate = useNavigate()
const {register} = useAuth();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const PostData = {
      email,
      password,
    };
    try {
      const data = await register(PostData);
      console.log("user registerd", data);
      setEmail("");
      setPassword("");
      navigate('/login')
    } catch (error) {
      console.log("registration fialed", error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="font-bold text-3xl  mb-3">Welcome to </h2>
      <h2 className="font-bold text-3xl mb-5">MovieChatter</h2>

      <form
        action="/submit"  onSubmit={HandleSubmit}
        className="flex flex-col gap-6 border border-gray-500 rounded-4xl p-6 w-90 mb-8"
      >
        {/* <label htmlFor=""  className=''>Username</label>
      <input type="text" placeholder='Email' className='py-2 px-1 border border-gray-500 rounded-lg'/> */}

        <label htmlFor="" className="">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          className="py-2 px-1 border border-gray-500 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="py-2 px-1 border border-gray-500 rounded-lg"
          value={password}
          onChange={(e) => {
           const val =e.target.value;
            setPassword(val);
            if(val.length < 5) {
              setError("Password must  be atleast 5 characters.");
            } else setError("");
          }}
        />
        <button
          type="submit"
          className="py-2 px-3 text-center border border-gray-500 rounded-lg mb-5"
        >
          Login
        </button>
      </form>
      <h2 className="font-semibold text-2xl mb-5">OR</h2>
      <button
        className="py-2 px-3 w-65 border border-gray-500 rounded-lg"
        disabled={!email || password < 5}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Register;
