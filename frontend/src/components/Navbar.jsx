import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";
function Navbar() {
  const {isAuthenticated}= useAuth();
  return (
    <nav className="h-15 text-lg lg:text-xl sticky top-0 z-10">
      <div className="flex h-full text-gray-200 justify-between text-[24px] items-center p-2 bg-gray-800">
        <div>
          <NavLink to='/'>

          <h2 className="font-semibold">MOVIECUT</h2>
          </NavLink>
          
        </div>

        <ul className="flex justify-between items-center font-semibold gap-12 ">
          <NavLink
            to="/"
            className="hover:underline hover:underline-offset-6 font-semibold"
          >
            <li>Home</li>
          </NavLink>
         

          <NavLink to="/movies" className="hover:underline underline-offset-6">
            <li>Movies</li>
          </NavLink>

          <NavLink to="/about" className="hover:underline underline-offset-6">
            <li>About</li>
          </NavLink>
        </ul>


{isAuthenticated ? <div>
  <div className="font-semibold mr-10">
   <ProfileMenu/>
    </div>


  


</div>: <ul className="flex justify-between items-center font-semibold gap-6">
          <NavLink to="/login" className="hover:underline underline-offset-6">
            <li>Login</li>
          </NavLink>

          <NavLink
            to="/register"
            className="hover:underline underline-offset-6"
          >
            <li>SignUp </li>
          </NavLink>
        </ul>}
       
      </div>
    </nav>
  );
}

export default Navbar;
